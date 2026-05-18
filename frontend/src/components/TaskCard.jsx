import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
} from '@mui/material';

export default function TaskCard({ task }) {
  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">
            {task.title}
          </Typography>

          <Chip
            label={
              task.completed
                ? 'Completada'
                : 'Pendiente'
            }
            color={
              task.completed
                ? 'success'
                : 'warning'
            }
          />
        </Stack>

        <Typography sx={{ mt: 1 }}>
          {task.description}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 2 }}
        >
          Responsable: {task.responsible}
        </Typography>
      </CardContent>
    </Card>
  );
}
