import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

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
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import api from '../api/api';
import TaskCard from '../components/TaskCard';
import { LoadingContext } from '../context/LoadingContext';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const { setLoading } = useContext(LoadingContext);

  const navigate = useNavigate();

  const fetchTasks = async (
    pageNumber = 1,
    pageSize = limit
  ) => {
    try {
      setLoading(true);

      const res = await api.get(
        `/tasks?page=${pageNumber}&limit=${pageSize}`
      );

      const data = res.data?.data || [];


      const pagination = res.data?.pagination || {};

      setTasks(data);

      setPage(pagination.page || 1);

      setLimit(pagination.limit || 10);

      setTotalPages(pagination.totalPages || 1);
    } catch (error) {
      console.error(
        'Error fetching tasks:',
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(1, limit);
  }, []);

  const handlePageChange = (
    _,
    value
  ) => {
    fetchTasks(value, limit);
  };

  const handleLimitChange = (e) => {
    const newLimit = Number(
      e.target.value
    );

    fetchTasks(1, newLimit);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 5,
        mb: 5,
      }}
    >
      {/* HEADER */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 4,
          mb: 4,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
          >
            Mis tareas
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            size="large"
            onClick={() =>
              navigate('/create')
            }
          >
            Nueva tarea
          </Button>
        </Box>
      </Paper>

      <Paper
        elevation={2}
        sx={{
          p: 3,
          borderRadius: 4,
          mb: 4,
        }}
      >
        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          spacing={3}
          alignItems={{
            xs: 'stretch',
            sm: 'center',
          }}
        >
          {/* PAGE SIZE */}
          <FormControl
            size="small"
            sx={{ minWidth: 180 }}
          >
            <InputLabel>
              Tamaño página
            </InputLabel>

            <Select
              value={limit}
              label="Tamaño página"
              onChange={
                handleLimitChange
              }
            >
              <MenuItem value={5}>
                5
              </MenuItem>

              <MenuItem value={10}>
                10
              </MenuItem>

              <MenuItem value={20}>
                20
              </MenuItem>
            </Select>
          </FormControl>

          {/* GO TO PAGE */}
          <TextField
            type="number"
            size="small"
            label="Ir a página"
            inputProps={{
              min: 1,
              max: totalPages,
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const num = Number(
                  e.target.value
                );

                if (
                  num >= 1 &&
                  num <= totalPages
                ) {
                  fetchTasks(
                    num,
                    limit
                  );
                }
              }
            }}
          />
        </Stack>
      </Paper>

      {/* TASK LIST */}
      <Box>
        {tasks.length === 0 ? (
          <Paper
            elevation={1}
            sx={{
              p: 5,
              textAlign: 'center',
              borderRadius: 4,
            }}
          >
            <Typography variant="h6">
              No hay tareas
            </Typography>
          </Paper>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
            />
          ))
        )}
      </Box>

      {/* PAGINATION */}
      <Box
        display="flex"
        justifyContent="center"
        mt={5}
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={
            handlePageChange
          }
          color="primary"
          size="large"
          shape="rounded"
        />
      </Box>
    </Container>
  );
}
