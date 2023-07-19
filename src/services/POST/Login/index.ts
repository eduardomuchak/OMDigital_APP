import { Alert } from 'react-native';
import { LoginFormData } from '../../../validations/common/LoginScreen';
import { api } from '../../api';
import { PostLogin } from './interface';

export const postLogin = async ({
  userCPF,
  password,
}: LoginFormData): Promise<PostLogin.Response> => {
  try {
    const payload = new FormData();
    payload.append('username', userCPF);
    payload.append('password', password);

    const { data } = await api.post('/user/auth', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error: any) {
    Alert.alert('Error', error?.message);
    throw error;
  }
};
