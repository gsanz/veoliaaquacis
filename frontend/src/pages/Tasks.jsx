import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../api/api';
import TaskCard from '../components/TaskCard';
import { LoadingContext } from '../context/LoadingContext';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  // 📊 PAGINACIÓN
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const { setLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  // 🚀 FETCH TASKS
  const fetchTasks = async (
    pageNumber = 1,
    pageSize = limit
  ) => {
    try {
      setLoading(true);

      const res = await api.get(
        `/tasks?page=${pageNumber}&limit=${pageSize}`
      );

      // ✅ DATA
      const data = res.data?.data || [];

      // ✅ PAGINATION
      const pagination = res.data?.pagination || {};

      setTasks(data);

      setPage(pagination.page || 1);

      setLimit(pagination.limit || 10);

      setTotalPages(pagination.totalPages || 1);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  // 🚀 INITIAL LOAD
  useEffect(() => {
    fetchTasks(1, limit);
  }, []);

  // ⬅️ PREVIOUS PAGE
  const handlePrev = () => {
    if (page > 1) {
      fetchTasks(page - 1, limit);
    }
  };

  // ➡️ NEXT PAGE
  const handleNext = () => {
    if (page < totalPages) {
      fetchTasks(page + 1, limit);
    }
  };

  // 🔢 GO TO SPECIFIC PAGE
  const handlePageClick = (num) => {
    fetchTasks(num, limit);
  };

  // 📦 CHANGE PAGE SIZE
  const handleLimitChange = (e) => {
    const newLimit = Number(e.target.value);

    // 🚨 reset page
    fetchTasks(1, newLimit);
  };

  // 🔢 PAGE BUTTONS
  const renderPages = () => {
    return Array.from(
      { length: totalPages },
      (_, i) => i + 1
    ).map((num) => (
      <button
        key={num}
        onClick={() => handlePageClick(num)}
        style={{
          margin: 3,
          padding: '5px 10px',
          fontWeight:
            num === page ? 'bold' : 'normal',
          background:
            num === page ? '#ddd' : 'white',
          cursor: 'pointer',
        }}
      >
        {num}
      </button>
    ));
  };

  return (
    <div style={{ padding: 20 }}>
      {/* HEADER */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1>Mis tareas</h1>

        <button
          onClick={() => navigate('/create')}
        >
          + Nueva tarea
        </button>
      </div>

      {/* 📦 PAGE SIZE */}
      <div style={{ margin: '15px 0' }}>
        <label>
          Tamaño página:{' '}
          <select
            value={limit}
            onChange={handleLimitChange}
          >
            <option value={5}>5</option>

            <option value={10}>10</option>

            <option value={20}>20</option>
          </select>
        </label>
      </div>

      {/* 📋 TASK LIST */}
      {tasks.length === 0 ? (
        <p>No hay tareas</p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
          />
        ))
      )}

      {/* 🔢 PAGINATION */}
      <div
        style={{
          marginTop: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={handlePrev}
          disabled={page === 1}
        >
          ⬅ Anterior
        </button>

        {renderPages()}

        <button
          onClick={handleNext}
          disabled={page === totalPages}
        >
          Siguiente ➡
        </button>
      </div>

      {/* 🔢 GO TO PAGE */}
      <div style={{ marginTop: 15 }}>
        <input
          type="number"
          min={1}
          max={totalPages}
          placeholder="Ir a página"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const num = Number(e.target.value);

              if (
                num >= 1 &&
                num <= totalPages
              ) {
                handlePageClick(num);
              }
            }
          }}
        />
      </div>
    </div>
  );
}
