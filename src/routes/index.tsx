import React from 'react';

import { Loading } from '../components/Loading';
import { useAuth } from '../contexts/auth';
import { AuthRoutes } from './auth.routes';
import { LogisticaRoutes } from './logistica.routes';
import { ManutencaoRoutes } from './manutencao.routes';
import { OperadorRoutes } from './operador.routes';
import { SolicitanteRoutes } from './solicitante.routes';

const Routes: React.FC = () => {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  switch (true) {
    case user?.user_type_name.toLowerCase() === 'solicitante':
      return <SolicitanteRoutes />;
    case user?.user_type_name.toLowerCase() === 'logistica':
      return <LogisticaRoutes />;
    case user?.user_type_name.toLowerCase() === 'manutencao':
      return <ManutencaoRoutes />;
    case user?.user_type_name.toLowerCase() === 'utilizador':
      return <OperadorRoutes />;
    default:
      return <AuthRoutes />;
  }
};

export default Routes;
