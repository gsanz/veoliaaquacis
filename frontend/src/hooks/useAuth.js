import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// 🔐 Hook limpio para auth
export const useAuth = () => {
  return useContext(AuthContext);
};
