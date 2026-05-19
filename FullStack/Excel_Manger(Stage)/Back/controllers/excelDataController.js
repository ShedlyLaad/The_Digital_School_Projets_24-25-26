import ExcelData from "../model/excelDataModel.js";
import XLSX from 'xlsx';
import mongoose from 'mongoose';
import crypto from 'crypto';

const calculateFileHash = (data, fileName) => {
  // Enhanced hash calculation to consider structure
  const headers = Object.keys(data[0] || {}).sort().join(',');
  const content = headers + fileName;
  return crypto.createHash('md5').update(content).digest('hex');
};

const compareData = (oldData, newData) => {
  // Compare and merge data while preserving IDs
  return newData.map(newRecord => {
    const existingRecord = oldData.find(old => 
      Object.entries(newRecord).every(([key, val]) => 
        key !== '_id' && old[key] === val
      )
    );
    return existingRecord ? { ...newRecord, _id: existingRecord._id } : { ...newRecord, _id: new mongoose.Types.ObjectId() };
  });
};

// Save new data
export const saveExcelData = async (req, res) => {
  try {
    const { data, fileName, originalName, lastModified } = req.body;

    if (!data || !Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ 
        message: "Les données sont invalides ou vides"
      });
    }

    const fileHash = calculateFileHash(data, originalName);
    
    // Check if file already exists
    let existingFile = await ExcelData.findOne({ fileHash });
    
    if (existingFile) {
      // Merge new data with existing records
      const mergedData = compareData(existingFile.data, data);
      existingFile.data = mergedData;
      existingFile.lastModified = lastModified;
      
      const updatedFile = await existingFile.save();
      
      return res.status(200).json({
        message: "Fichier mis à jour avec succès",
        data: updatedFile,
        updated: true
      });
    }

    // Create new file entry
    const processedData = data.map(record => ({
      ...record,
      _id: new mongoose.Types.ObjectId()
    }));

    const newExcelData = new ExcelData({
      fileName,
      originalName,
      fileHash,
      lastModified,
      data: processedData
    });

    const savedData = await newExcelData.save();

    res.status(201).json({
      message: "Données sauvegardées avec succès",
      data: savedData,
      created: true
    });
  } catch (error) {
    console.error("Erreur lors de la sauvegarde:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la sauvegarde",
      error: error.message
    });
  }
};

// Get all data
export const getAllData = async (req, res) => {
  try {
    const data = await ExcelData.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Get single data by ID
export const getDataById = async (req, res) => {
  try {
    const data = await ExcelData.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "File not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Update specific record in a file
export const updateData = async (req, res) => {
  try {
    const { fileId, recordId } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(fileId)) {
      return res.status(400).json({ message: "ID de fichier invalide" });
    }

    if (!mongoose.Types.ObjectId.isValid(recordId)) {
      return res.status(400).json({ message: "ID d'enregistrement invalide" });
    }

    const file = await ExcelData.findById(fileId);
    if (!file) {
      return res.status(404).json({ message: "Fichier non trouvé" });
    }

    const recordIndex = file.data.findIndex(
      record => record._id.toString() === recordId
    );

    if (recordIndex === -1) {
      return res.status(404).json({ message: "Enregistrement non trouvé" });
    }

    // Préserver l'ID tout en mettant à jour les autres champs
    file.data[recordIndex] = {
      ...updateData,
      _id: file.data[recordIndex]._id
    };

    const updatedFile = await file.save();
    res.status(200).json({
      message: "Mise à jour réussie",
      data: updatedFile
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la mise à jour",
      error: error.message
    });
  }
};

// Delete specific record from a file or entire file
export const deleteData = async (req, res) => {
  try {
    const { fileId, recordId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(fileId)) {
      return res.status(400).json({ message: "ID de fichier invalide" });
    }

    // Supprimer le fichier entier si pas d'ID d'enregistrement
    if (!recordId) {
      const deletedFile = await ExcelData.findByIdAndDelete(fileId);
      if (!deletedFile) {
        return res.status(404).json({ message: "Fichier non trouvé" });
      }
      return res.status(200).json({ message: "Fichier supprimé avec succès" });
    }

    if (!mongoose.Types.ObjectId.isValid(recordId)) {
      return res.status(400).json({ message: "ID d'enregistrement invalide" });
    }

    const file = await ExcelData.findById(fileId);
    if (!file) {
      return res.status(404).json({ message: "Fichier non trouvé" });
    }

    const recordIndex = file.data.findIndex(
      record => record._id.toString() === recordId
    );

    if (recordIndex === -1) {
      return res.status(404).json({ message: "Enregistrement non trouvé" });
    }

    file.data.splice(recordIndex, 1);
    await file.save();

    res.status(200).json({ message: "Enregistrement supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la suppression",
      error: error.message
    });
  }
};

// Export specific file to Excel
export const exportToExcel = async (req, res) => {
  try {
    const { fileId } = req.params;
    const file = await ExcelData.findById(fileId);
    
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    
    // Transform data for Excel format
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(
      file.data.map(item => {
        const cleanItem = { ...item };
        delete cleanItem._id;
        return cleanItem;
      })
    );
    
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    
    // Create buffer
    const excelBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
    
    // Set headers for file download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", `attachment; filename=data_${fileId}.xlsx`);
    
    res.send(excelBuffer);
  } catch (error) {
    console.error("Error exporting to Excel:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};