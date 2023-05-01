export function SignInWithCredentials({
  userCPF,
  password,
}: {
  userCPF: string;
  password: string;
}) {
  return {
    data: {
      user: 'Eduardo',
      role: 'manutencao',
      session: '123456789',
    },
    error: null,
  };
}
