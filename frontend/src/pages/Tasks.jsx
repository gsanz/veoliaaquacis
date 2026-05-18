import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../api/api';
import TaskCard from '../components/TaskCard';
import { LoadingContext } from '../context/LoadingContext';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  // 📊 PAGINACIÓN
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const { setLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  const fetchTasks = async (pageNumber = 1) => {
    try {
      setLoading(true);

      const res = await api.get(
        `/tasks?page=${pageNumber}&limit=${limit}`
      );

      // 🧠 soporta backend con o sin wrapper
      const data = res.data?.data || res.data;
      const total = res.data?.totalPages || 1;

      setTasks(data);
      setTotalPages(total);
      setPage(pageNumber);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(1);
  }, []);

  // ⬅️ página anterior
  const handlePrev = () => {
    if (page > 1) {
      fetchTasks(page - 1);
    }
  };

  // ➡️ página siguiente
  const handleNext = () => {
    if (page < totalPages) {
      fetchTasks(page + 1);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Mis tareas</h1>

        <button onClick={() => navigate('/create')}>
          + Nueva tarea
        </button>
      </div>

      {/* LISTA */}
      {tasks.length === 0 ? (
        <p>No hay tareas</p>
      ) : (
        tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))
      )}

      {/* 📊 PAGINACIÓN UI */}
      <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
        <button onClick={handlePrev} disabled={page === 1}>
          ⬅ Anterior
        </button>

        <span>
          Página {page} de {totalPages}
        </span>

        <button onClick={handleNext} disabled={page === totalPages}>
          Siguiente ➡
        </button>
      </div>
    </div>
  );
}
