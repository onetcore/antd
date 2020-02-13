import request from '@/utils/request';
import { UserRegisterParams } from './index';

export async function fakeRegister(params: UserRegisterParams) {
  return request('/api/account/register', {
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