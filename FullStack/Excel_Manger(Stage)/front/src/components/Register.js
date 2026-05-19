import React, { useState } from "react";
import { Form, Input, Button, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import API from "../api/axiosInstance";
import AuthLayout from "../components/authLayout.js";

const { Option } = Select;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      const response = await API.post("/users/register", values);
      message.success("Inscription réussie !");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      const status = error.response?.status;
      if (status === 409) {
        message.error("Cet email est déjà utilisé.");
      } else {
        message.error("Erreur lors de l'inscription.");
      }
    }
    setLoading(false);
  };

  return (
    <AuthLayout title="Inscription">
      <Form form={form} layout="vertical" onFinish={handleRegister}>
        <Form.Item
          name="name"
          label="Nom"
          rules={[{ required: true, message: "Veuillez entrer votre nom" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastname"
          label="Prénom"
          rules={[{ required: true, message: "Veuillez entrer votre prénom" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="mail"
          label="Email"
          rules={[
            { required: true, message: "Veuillez entrer votre email" },
            { type: "email", message: "Email invalide" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Mot de passe"
          rules={[
            { required: true, message: "Veuillez entrer un mot de passe" },
            { min: 6, message: "Minimum 6 caractères" },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="role"
          label="Rôle"
          rules={[{ required: true, message: "Veuillez sélectionner un rôle" }]}
        >
          <Select placeholder="Sélectionner un rôle">
            <Option value="admin">Admin</Option>
            <Option value="user">Utilisateur</Option>
          </Select>
        </Form.Item>
        <Form.Item name="photo" label="Photo">
          <Upload beforeUpload={() => false} maxCount={1}>
            <Button icon={<UploadOutlined />}>Télécharger une photo</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
        <Button
  type="primary"
  htmlType="submit"
  loading={loading}
  block
  style={{ backgroundColor: "green", borderColor: "green" }}
>
            S'inscrire
          </Button>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
};

export default Register;
