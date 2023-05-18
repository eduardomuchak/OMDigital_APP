import React from "react";

import { Loading } from "../components/Loading";
import { useAuth } from "../contexts/auth";
import { AuthRoutes } from "./auth.routes";
import { LogisticaRoutes } from "./logistica.routes";
import { ManutencaoRoutes } from "./manutencao.routes";
import { OperadorRoutes } from "./operador.routes";
import { SolicitanteRoutes } from "./solicitante.routes";

const Routes: React.FC = () => {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  switch (true) {
    case user?.role === "solicitante":
      return <SolicitanteRoutes />;
    case user?.role === "logistica":
      return <LogisticaRoutes />;
    case user?.role === "manutencao":
      return <ManutencaoRoutes />;
    case user?.role === "operador":
      return <OperadorRoutes />;
    default:
      return <AuthRoutes />;
  }
};

export default Routes;
