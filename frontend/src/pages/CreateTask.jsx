import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createTask } from '../services/task.service';
import { LoadingContext } from '../context/LoadingContext';

export default function CreateTask() {
  const { setLoading } = useContext(LoadingContext);
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

    if (!form.title || !form.responsible) {
      toast.error('Título y responsable son obligatorios');
      return;
    }

    try {
      setLoading(true);

      await createTask(form);

      toast.success('Tarea creada correctamente');

      navigate('/tasks');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error al crear tarea');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Crear nueva tarea</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
        />

        <br />

        <input
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
        />

        <br />

        <input
          name="responsible"
          placeholder="Responsable"
          value={form.responsible}
          onChange={handleChange}
        />

        <br />

        <button type="submit">
          Crear tarea
        </button>
      </form>
    </div>
  );
}
