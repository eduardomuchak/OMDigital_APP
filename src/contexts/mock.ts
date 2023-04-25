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
      role: 'solicitante',
      session: '123456789',
    },
    error: null,
  };
}
