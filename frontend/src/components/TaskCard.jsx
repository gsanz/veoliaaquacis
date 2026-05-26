import { Card, CardContent, Typography, Chip, Box, Stack } from "@mui/material";

export default function TaskCard({ task }) {
  return (
    <Card
      elevation={0}
      sx={{
        mb: 1, // Espacio mínimo entre tarjetas para que no se peguen
        borderRadius: 2,
        border: "1px solid #e2e8f0",
        "& .MuiCardContent-root": { padding: 1.5, "&:last-child": { pb: 1.5 } }, // Relleno interno optimizado
      }}
    >
      <CardContent>
        {/* FILA 1: TÍTULO Y ESTADO */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={1.5}
          flexWrap="wrap"
          sx={{ mb: 1 }}
        >
          <Typography
            variant="body2"
            sx={{ color: "#1a202c", lineHeight: 1.2 }}
          >
            <strong>Título:</strong> {task.title}
          </Typography>

          <Box display="flex" alignItems="center" gap={0.5}>
            <Typography
              variant="caption"
              sx={{ color: "#4a5568", fontWeight: 700 }}
            >
              Estado:
            </Typography>
            <Chip
              label={task.completed ? "Completada" : "Pendiente"}
              color={task.completed ? "success" : "warning"}
              size="small"
              sx={{
                fontWeight: 700,
                borderRadius: "6px",
                height: "20px",
                fontSize: "0.7rem",
              }}
            />
          </Box>
        </Box>

        {/* CONTENEDOR VERTICAL PARA SEPARAR LOS CAMPOS RESTANTES */}
        <Stack spacing={0.8}>
          {/* FILA 2: DESCRIPCIÓN */}
          {task.description && (
            <Typography
              variant="caption"
              display="block"
              sx={{ color: "#4a5568" }}
            >
              <strong>Descripción:</strong> {task.description}
            </Typography>
          )}

          {/* FILA 3: RESPONSABLE (Perfectamente separado de la descripción) */}
          <Typography variant="caption" color="text.secondary" display="block">
            <strong>Responsable:</strong> {task.responsible || "Sin asignar"}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
