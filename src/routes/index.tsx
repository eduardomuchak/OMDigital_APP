import React from 'react';

import { useAuth } from '../contexts/auth';
import { AuthRoutes } from './auth.routes';
import { LogisticaRoutes } from './logistica.routes';
import { ManutencaoRoutes } from './manutencao.routes';
import { OperadorRoutes } from './operador.routes';
import { SolicitanteRoutes } from './solicitante.routes';

const Routes: React.FC = () => {
  const { employee } = useAuth();

  switch (true) {
    case employee?.function_name.toLowerCase() === 'solicitante':
      return <SolicitanteRoutes />;
    case employee?.function_name.toLowerCase() === 'gestor de logística':
      return <LogisticaRoutes />;
    case employee?.function_name.toLowerCase() === 'gestor de frota':
      return <ManutencaoRoutes />;
    case employee?.function_name.toLowerCase() === 'operador':
      return <OperadorRoutes />;
    case employee?.function_name.toLowerCase() === 'administrador':
      return <OperadorRoutes />;
    default:
      return <AuthRoutes />;
  }
};

export default Routes;
