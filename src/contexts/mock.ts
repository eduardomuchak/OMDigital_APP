import { LoginFormData } from "../validations/LoginScreen";

const operador = {
  user: "Operador",
  role: "operador",
  session: "123456789",
};

const manutencao = {
  user: "Manutenção",
  role: "manutencao",
  session: "987654321",
};

const logistica = {
  user: "Logística",
  role: "logistica",
  session: "234876534",
};

const solicitante = {
  user: "Solicitante",
  role: "solicitante",
  session: "345978234",
};

export function SignInWithCredentials({ userCPF, password }: LoginFormData) {
  if (userCPF === "11111111111") {
    return {
      data: operador,
      error: null,
    };
  }
  if (userCPF === "22222222222") {
    return {
      data: manutencao,
      error: null,
    };
  }
  if (userCPF === "33333333333") {
    return {
      data: logistica,
      error: null,
    };
  }
  if (userCPF === "44444444444") {
    return {
      data: solicitante,
      error: null,
    };
  }
  return {
    data: null,
    error: { message: "Usuário ou senha inválidos" },
  };
}
