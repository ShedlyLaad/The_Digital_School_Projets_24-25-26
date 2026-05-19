import express from "express";
import { 
    register, 
    login, 
    fetchUsers, 
    updateUser, 
    deleteUser, 
    fetchOneUser 
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js"; 

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", authMiddleware, adminMiddleware, fetchUsers); 
router.get("/:id", authMiddleware, fetchOneUser);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware,adminMiddleware, deleteUser);

export default router;
