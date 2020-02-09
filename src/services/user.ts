import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/users');
}

/**
 * 获取当前登录用户实例。
 */
export async function queryCurrent(): Promise<any> {
  return request('/api/user/current');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}

/**
 * 退出登录。
 */
export async function fakeLogout(): Promise<any> {
  return request('/api/user/logout', { method: 'POST' });
}
