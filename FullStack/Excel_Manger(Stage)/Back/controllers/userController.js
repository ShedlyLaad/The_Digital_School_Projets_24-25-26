import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

export const register = async (req, res) => {
    try {
        const { name, lastname, mail, password, role, photo } = req.body;

        if (!name || !lastname || !mail || !password) {
            return res.status(400).json({ message: "All required fields must be provided!" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(mail)) {
            return res.status(400).json({ message: "Invalid email format!" });
        }

        const existingUser = await User.findOne({ mail });
        if (existingUser) {
            return res.status(400).json({ message: "User Already Exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            lastname,
            mail,
            password: hashedPassword,
            role: role || 'user', // valeur par défaut si non spécifié
            photo
        });

        const savedUser = await newUser.save();
        res.status(201).json({
            message: "User Created Successfully!",
            user: savedUser
        });

    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            error: "Internal Server ERROR!",
            details: error.message
        });
    }
};
  
export const login = async (req, res) => {
    try {
      const { mail, password } = req.body;
      const user = await User.findOne({ mail });
      if (!user || !(await bcrypt.compare(password, user.password))) return res.status(400).json({ message: "Invalid Email or Password" });
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.json({ message: "Login Successful", token, user });
    } catch (error) { res.status(500).json({ error: "Internal Server ERROR!" }); }
  };

export const fetchUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Internal Server ERROR!" });
    }
};

export const fetchOneUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User Not Found" });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal Server ERROR!" });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: "User Not Found" });

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: "Internal Server ERROR!" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ message: "User Not Found" });

        res.status(200).json({ message: "User Deleted Successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server ERROR!" });
    }
};
