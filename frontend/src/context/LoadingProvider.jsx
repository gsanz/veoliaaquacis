import { useState } from 'react';
import { LoadingContext } from './LoadingContext';

// ⚡ SOLO componente
export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}
