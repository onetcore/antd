import request from '@/utils/request';

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

/**
 * 发送登录请求。
 * @param params {LoginParamsType} 登录用户类型。
 */
export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/login', {
    method: 'POST',
    data: params,
  });
}

/**
 * 获取当前电话号码的短信验证码。
 * @param mobile {string} 电话号码。
 */
export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
