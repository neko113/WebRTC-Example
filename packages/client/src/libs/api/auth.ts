import type { AuthParams } from '~/libs/types';
import apiClient from './apiClient';

const AuthAPI = {
  login: async ({ email, password }: AuthParams) => {
    const { data } = await apiClient.post('/auth/login', {
      email,
      password,
    });
    return data;
  },
  logout: async () => {
    const { data } = await apiClient.delete('/auth/logout');
    return data;
  },
};

export default AuthAPI;