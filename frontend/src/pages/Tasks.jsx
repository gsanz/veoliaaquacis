import { useEffect, useState } from 'react';
import api from '../api/api';
import TaskCard from '../components/TaskCard';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get('/tasks?page=1&limit=10');

        const data = res.data?.data || res.data;

        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Mis tareas</h1>

      {tasks.length === 0 ? (
        <p>No hay tareas</p>
      ) : (
        tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))
      )}
    </div>
  );
}
