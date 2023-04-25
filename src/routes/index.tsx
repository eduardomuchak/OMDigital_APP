import React from 'react';

import { useAuth } from '../contexts/auth';
import { Loading } from '../components/Loading';
import { AuthRoutes } from './auth.routes';
import { VisaoSolicitanteRoutes } from './visaoSolicitante.routes';
import { VisaoOperadorRoutes } from './visaoOperador.routes';
import { VisaoControladorManutencaoRoutes } from './visaoControladorManutencao.routes';
import { VisaoControladorLogisticaRoutes } from './visaoControladorLogistica.routes';

const Routes: React.FC = () => {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  switch (true) {
    case user?.role === 'solicitante':
      return <VisaoSolicitanteRoutes />;
    case user?.role === 'operador':
      return <VisaoOperadorRoutes />;
    case user?.role === 'manutencao':
      return <VisaoControladorManutencaoRoutes />;
    case user?.role === 'logistica':
      return <VisaoControladorLogisticaRoutes />;
    default:
      return <AuthRoutes />;
  }
};

export default Routes;
