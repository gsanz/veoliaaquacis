import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import Navbar from "./components/Navbar";

import { AuthContext } from "./context/AuthContext";
import CreateTask from "./pages/CreateTask";

export default function App() {
  const { token } = useContext(AuthContext);

  return (
    <>
      {/* 🚪 Navbar SOLO si estás logueado */}
      {token && <Navbar />}

      <Routes>
        {/* 🔐 Login */}
        <Route
          path="/"
          element={!token ? <Login /> : <Navigate to="/tasks" />}
        />

        {/* 📋 Tasks protegida */}
        <Route
          path="/tasks"
          element={token ? <Tasks /> : <Navigate to="/" />}
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to={token ? "/tasks" : "/"} />} />
        <Route
          path="/create-task"
          element={token ? <CreateTask /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}
