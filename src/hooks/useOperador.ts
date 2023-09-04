import { useContext } from 'react';
import { OperadorContext } from '../contexts/Operador';

function useOperador() {
  const context = useContext(OperadorContext);

  if (!context) {
    throw new Error('useOperador must be used within an OperadorProvider.');
  }

  return context;
}

export { useOperador };
