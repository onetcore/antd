import request from '@/utils/request';
import { RoleModel } from './types';
/**
 * 获取所有角色列表。
 */
export async function query() {
  return request('/api/roles');
}

/**
 * 移除角色。
 * @param ids {number[]} 角色ID列表。
 */
export async function remove(ids: number[]) {
  return request('/api/roles/remove', {
    method: 'POST',
    data:ids,
  });
}

/**
 * 添加角色。
 * @param params {RoleModel} 角色实例。
 */
export async function create(params: RoleModel) {
  return request('/api/role/create', {
    method: 'POST',
    data: {
      ...params
    },
  });
}

/**
 * 更新角色。
 * @param params {RoleModel} 角色实例。
 */
export async function update(params: RoleModel) {
  return request('/api/role/update', {
    method: 'POST',
    data: {
      ...params
    },
  });
}
