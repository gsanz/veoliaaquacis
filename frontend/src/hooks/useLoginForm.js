import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";
import { useAuth } from "./useAuth";

export function useLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    // Si usas un <form>, previene el comportamiento por defecto
    if (e && e.preventDefault) e.preventDefault();

    if (!email || !password) {
      toast.error("Email y password son obligatorios");
      return;
    }

    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token);
      toast.success("Login correcto");
      navigate("/tasks");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error de autenticación");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
  };
}
