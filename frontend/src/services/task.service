import api from '../api/api';

// 📦 Obtener tareas con paginación
export const getTasks = (page = 1, limit = 10) => {
  return api.get(`/tasks?page=${page}&limit=${limit}`);
};

// ➕ Crear nueva tarea
export const createTask = (data) => {
  return api.post('/tasks', data);
};

// ❌ Eliminar tarea
export const deleteTask = (id) => {
  return api.delete(`/tasks/${id}`);
};

// ✅ Marcar como completada
export const completeTask = (id) => {
  return api.patch(`/tasks/${id}/complete`);
};
