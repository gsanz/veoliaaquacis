import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../api/api';
import TaskCard from '../components/TaskCard';
import { LoadingContext } from '../context/LoadingContext';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const { setLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);

        const res = await api.get('/tasks?page=1&limit=10');

        // 🧠 soporta backend con o sin pagination wrapper
        const data = res.data?.data || res.data;

        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [setLoading]);

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Mis tareas</h1>

        <button onClick={() => navigate('/create')}>
          + Nueva tarea
        </button>
      </div>

      {/* 📭 empty state */}
      {tasks.length === 0 ? (
        <p>No hay tareas todavía</p>
      ) : (
        tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))
      )}
    </div>
  );
}
