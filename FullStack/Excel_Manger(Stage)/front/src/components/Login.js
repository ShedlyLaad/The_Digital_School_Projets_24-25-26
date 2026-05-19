import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import API from "../api/axiosInstance";
import AuthLayout from "../components/authLayout.js";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await API.post("/users/login", values);
      localStorage.setItem("token", response.data.token); // Store token
      message.success("Connexion réussie !");
      navigate("/"); // Mise à jour de la redirection vers la racine
    } catch (error) {
      if (error.response?.status === 401) {
        message.error("Email ou mot de passe incorrect.");
      } else {
        message.error("Erreur de connexion.");
      }
    }
    setLoading(false);
  };

  return (
    <AuthLayout title="Connexion" >
      <Form form={form} layout="vertical" onFinish={handleLogin}>
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
          rules={[{ required: true, message: "Veuillez entrer votre mot de passe" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
        <Button
  type="primary"
  htmlType="submit"
  loading={loading}
  block
  style={{ backgroundColor: "green", borderColor: "green" }}
>
            Se connecter
          </Button>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
};

export default Login;
