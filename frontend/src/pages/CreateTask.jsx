import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

// Importamos tu hook personalizado
import { useTasks } from "../hooks/useTasks";

export default function CreateTask() {
  const navigate = useNavigate();
  const { createTask } = useTasks(); // 👈 Consumimos la lógica del hook

  const [form, setForm] = useState({
    title: "",
    description: "",
    responsible: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Pasamos el objeto 'form' completo al hook
    const success = await createTask(form);
    if (success) {
      navigate("/tasks"); // Volvemos al listado si todo salió bien
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

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Título"
            margin="normal"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Descripción"
            margin="normal"
            name="description"
            value={form.description}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Responsable"
            margin="normal"
            name="responsible"
            value={form.responsible}
            onChange={handleChange}
          />

          <Button fullWidth variant="contained" type="submit" sx={{ mt: 3 }}>
            Crear tarea
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
