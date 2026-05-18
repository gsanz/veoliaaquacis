import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Tasks from './pages/Tasks';

export default function App() {
  return (
      <><Navbar /><Routes>
          <Route path="/" element={<Login />} />
          <Route path="/tasks" element={<Tasks />} />
      </Routes></>
  );
}
