import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{ padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
      <h3>Tasks App</h3>

      <button onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}
