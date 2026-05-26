import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Stack,
  Paper,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TaskCard from "../components/TaskCard";

// Tu hook personalizado
import { useTasks } from "../hooks/useTasks";

export default function Tasks() {
  const navigate = useNavigate();

  // Consumimos todo el estado y la paginación sincronizada desde el hook
  const { tasks, page, limit, totalPages, fetchTasks } = useTasks();

  useEffect(() => {
    fetchTasks(1, limit);
  }, [1, limit]);

  const handlePageChange = (_, value) => {
    fetchTasks(value, limit);
  };

  const handleLimitChange = (e) => {
    const newLimit = Number(e.target.value);
    fetchTasks(1, newLimit);
  };

  const handleGoToPage = (e) => {
    if (e.key === "Enter" || e.type === "blur") {
      const targetPage = Number(e.target.value);
      if (targetPage >= 1 && targetPage <= totalPages) {
        fetchTasks(targetPage, limit);
      }
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      {/* 🚀 BANNER / HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          mb: 4,
          p: 1,
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        <Box>
          <Typography
            variant="h4"
            component="h1"
            fontWeight="800"
            sx={{ color: "#1a202c", letterSpacing: "-0.5px" }}
          >
            Mis Tareas
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
            Gestiona y organiza tus actividades pendientes con facilidad.
          </Typography>
        </Box>

        {/* Botón enlazado correctamente a la ruta "/create" de tu App.jsx */}
        <Button
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          onClick={() => navigate("/create-task")}
          sx={{
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 600,
            px: 3,
            boxShadow: "0px 4px 12px rgba(25, 118, 210, 0.2)",
            background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
            "&:hover": {
              background: "linear-gradient(45deg, #1565c0 30%, #1e88e5 90%)",
            },
          }}
        >
          Nueva Tarea
        </Button>
      </Box>

      {/* 📋 CONTENEDOR PRINCIPAL DE TARJETAS */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: "20px",
          backgroundColor: "#f8fafc", // Fondo gris claro sutil moderno
          border: "1px solid #e2e8f0",
          minHeight: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* LISTADO DE TARJETAS */}
        <Stack spacing={2} sx={{ mb: 4 }}>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <Box
                key={task._id || task.id}
                sx={{
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <TaskCard
                  task={task}
                  onTaskUpdated={() => fetchTasks(page, limit)}
                />
              </Box>
            ))
          ) : (
            <Box textAlign="center" sx={{ py: 8 }}>
              <Typography variant="h6" color="textSecondary" fontWeight="500">
                ¡Todo al día por aquí! 🎉
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                No tienes tareas pendientes creadas en este momento.
              </Typography>
            </Box>
          )}
        </Stack>

        {/* ⚙️ SECCIÓN DE PAGINACIÓN CORREGIDA (Sin solapamientos) */}
        {tasks.length > 0 && (
          <Box>
            <Divider sx={{ my: 3, borderColor: "#e2e8f0" }} />

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexDirection={{ xs: "column", md: "row" }}
              gap={3}
            >
              {/* Contenedor ordenado para los selectores de la izquierda */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                alignItems="center"
                width={{ xs: "100%", md: "auto" }}
                justifyContent="center"
              >
                {/* Selector de Filas */}
                <FormControl
                  variant="outlined"
                  size="small"
                  sx={{ minWidth: 130, width: { xs: "100%", sm: "auto" } }}
                >
                  <InputLabel id="limit-select-label" sx={{ color: "#64748b" }}>
                    Filas por pág.
                  </InputLabel>
                  <Select
                    labelId="limit-select-label"
                    value={limit}
                    onChange={handleLimitChange}
                    label="Filas por pág."
                    sx={{ borderRadius: "10px", backgroundColor: "#fff" }}
                  >
                    <MenuItem value={5}>5 filas</MenuItem>
                    <MenuItem value={10}>10 filas</MenuItem>
                    <MenuItem value={20}>20 filas</MenuItem>
                  </Select>
                </FormControl>

                {/* Saltador de Página */}
                <TextField
                  label="Ir a página"
                  variant="outlined"
                  size="small"
                  type="number"
                  defaultValue={page}
                  onKeyDown={handleGoToPage}
                  onBlur={handleGoToPage}
                  inputProps={{ min: 1, max: totalPages }}
                  sx={{
                    width: { xs: "100%", sm: 110 },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      backgroundColor: "#fff",
                    },
                  }}
                />
              </Stack>

              {/* Componente Central de Páginas */}
              {totalPages > 1 && (
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  size="medium"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      borderRadius: "10px",
                      fontWeight: 600,
                    },
                  }}
                />
              )}
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
