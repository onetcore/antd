import request from '@/utils/request';
import { UserRegisterParams, CaptchType } from './index';

export async function fakeRegister(params: UserRegisterParams) {
  return request('/api/register', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(params: CaptchType) {
  return request(`/api/register/captcha?mobile=${params.mobile}&prefix=${params.prefix}`);
}
