import request from '@/utils/request';
import { UserQuery } from '@/pages/admin/users/list/model';

export async function query(params: UserQuery): Promise<any> {
  return request('/api/admin/users', { params });
}

/**
 * 获取当前登录用户实例。
 */
export async function queryCurrent(): Promise<any> {
  return request('/api/account/user/current');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}

/**
 * 退出登录。
 */
export async function fakeLogout(): Promise<any> {
  return request('/api/account/user/logout', { method: 'POST' });
}
