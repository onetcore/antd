import request from '@/utils/request';
import { RegisterUserModel } from './model.d';

export async function fakeRegister(params: RegisterUserModel) {
  return request('/api/register', {
    method: 'POST',
    data: params,
  });
}

/**
 * 获取当前电话号码的短信验证码。
 * @param mobile {string} 电话号码。
 */
export async function getCaptcha(mobile: string) {
  return request(`/api/captcha/register?mobile=${mobile}`);
}