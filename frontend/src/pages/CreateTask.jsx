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

export default function CreateTask() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    responsible: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/tasks', form);

      toast.success('Tarea creada');

      navigate('/tasks');
    } catch (error) {
      toast.error('Error creando tarea');
    }
  };

   return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper
        elevation={5}
        sx={{
          p: 4,
          borderRadius: 4,
        }}
      >
        <Typography variant="h4" mb={3}>
          Nueva tarea
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            label="Título"
            margin="normal"
            name="title"
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Descripción"
            margin="normal"
            name="description"
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Responsable"
            margin="normal"
            name="responsible"
            onChange={handleChange}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 3 }}
          >
            Crear tarea
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
