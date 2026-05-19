import express from "express";
import { 
    saveExcelData, 
    getAllData, 
    getDataById, 
    updateData, 
    deleteData,
    exportToExcel 
} from "../controllers/excelDataController.js";

const router = express.Router();

// CRUD operations
router.post("/save", saveExcelData);
router.get("/", getAllData);
router.get("/:id", getDataById);
router.put("/:fileId/:recordId", updateData);

// Routes de suppression séparées
router.delete("/file/:fileId", deleteData); // Supprimer un fichier entier
router.delete("/:fileId/:recordId", deleteData); // Supprimer un enregistrement spécifique

// Export to Excel
router.get("/export/excel/:fileId", exportToExcel);

export default router;