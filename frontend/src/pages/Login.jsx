import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';

import { toast } from 'react-toastify';

import api from '../api/api';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const { login } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Email y password son obligatorios');
      return;
    }

    try {
      const res = await api.post('/auth/login', {
        email,
        password,
      });

      login(res.data.token);

      toast.success('Login correcto');

      navigate('/tasks');
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          'Error de autenticación'
      );
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={6}
          sx={{
            width: '100%',
            p: 4,
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            textAlign="center"
          >
            Login
          </Typography>

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
            onClick={handleLogin}
          >
            Entrar
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}
