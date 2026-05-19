import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true }
}, { 
  strict: false, 
  _id: false 
});

const excelDataSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  fileHash: { type: String, required: true, index: true },
  originalName: { type: String, required: true },
  lastModified: { type: Date, required: true },
  data: [recordSchema] 
}, { 
  timestamps: true 
});

excelDataSchema.index({ fileHash: 1 });

const ExcelData = mongoose.model("ExcelData", excelDataSchema);

export default ExcelData;