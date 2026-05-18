import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

import styles from '../styles/login.module.css';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // 🔐 VALIDACIÓN FRONTEND
    if (!email || !password) {
      toast.error('Email y password son obligatorios');
      return;
    }

    if (password.length < 6) {
      toast.error('La password debe tener al menos 6 caracteres');
      return;
    }

    try {
      const res = await api.post('/auth/login', {
        email,
        password,
      });

      login(res.data.token);

      toast.success('Login correcto 🎉');

      navigate('/tasks');
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Error inesperado'
      );
    }
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>
        Entrar
      </button>
    </div>
  );
}
