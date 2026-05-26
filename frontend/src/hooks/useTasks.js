import { useState, useCallback } from "react";
import api from "../api/api";
import { useLoading } from "./useLoading";
import { toast } from "react-toastify";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const { setLoading } = useLoading();

  const fetchTasks = useCallback(
    async (pageNumber = 1, pageSize = 10) => {
      try {
        setLoading(true);
        const res = await api.get(
          `/tasks?page=${pageNumber}&limit=${pageSize}`,
        );

        const data = res.data?.data || [];
        const pagination = res.data?.pagination || {};

        setTasks(data);
        setPage(pagination.page || pageNumber);
        setLimit(pagination.limit || pageSize);
        setTotalPages(pagination.totalPages || 1);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    },
    [setLoading],
  );

  // 🚀 CREATE: Ahora acepta el objeto completo del formulario (título, descripción, responsable)
  const createTask = async (taskData) => {
    try {
      await api.post("/tasks", taskData);
      toast.success("Tarea creada correctamente");
      return true;
    } catch (error) {
      toast.error("Error creando tarea");
      return false;
    }
  };

  return {
    tasks,
    page,
    limit,
    totalPages,
    fetchTasks,
    createTask,
  };
}
