import { api } from '../../api';

interface RecoveryPasswordProps {
  text: string | undefined;
}

export async function getRecoveryPassword({ text }: RecoveryPasswordProps) {
  try {
    await api.get(`/user/recoveryPassword/${text}`);
    return true;
  } catch (error: any) {
    console.error(error);
    return false;
  }
}
