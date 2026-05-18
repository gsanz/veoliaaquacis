import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/login.module.css';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      setError(null);

      const res = await api.post('/auth/login', {
        email,
        password,
      });

      login(res.data.token);
      navigate('/tasks');
    } catch (err) {
      const message =
        err.response?.data?.message ||
        'Error inesperado';

      setError(message);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Entrar</button>

      {/* 🔥 MENSAJE DE ERROR */}
      {error && (
        <p style={{ color: 'red', marginTop: '10px' }}>
          {error}
        </p>
      )}
    </div>
  );
}
