import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useLoginForm } from "../hooks/useLoginForm";

export default function Login() {
  const { email, setEmail, password, setPassword, handleLogin } =
    useLoginForm();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper elevation={6} sx={{ width: "100%", p: 4, borderRadius: 4 }}>
          <Typography variant="h4" gutterBottom textAlign="center">
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
            color="primary"
            onClick={handleLogin}
            sx={{ mt: 2 }}
          >
            Iniciar Sesión
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}
