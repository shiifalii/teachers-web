import { loginUserParamsInterface } from 'app/types/api.params.types';
import { publicAxiosInstance } from './comman.helper';

export async function loginUser(params: loginUserParamsInterface) {
  return await publicAxiosInstance.post('/users/login', params);
}

export async function getUserSettingsFromToken({
  authToken,
}: {
  authToken: string;
}) {
  return await publicAxiosInstance.post('/users/settings', {
    auth_token: authToken,
  });
}

export async function forgetPasswordRequest(params: any) {
  return await publicAxiosInstance.post('/users/password/recovery', params);
}

export async function updatePasswordRequest(secret: string, params: any) {
  return await publicAxiosInstance.post(
    `/users/change_password/${secret}`,
    params,
  );
}
