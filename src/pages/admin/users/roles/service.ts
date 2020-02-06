import request from '@/utils/request';
import { RoleModel } from './data';

export async function query() {
  return request('/api/roles');
}

export async function remove(ids: number[]) {
  return request('/api/roles/remove', {
    method: 'POST',
    data:ids,
  });
}

export async function create(params: RoleModel) {
  return request('/api/role/create', {
    method: 'POST',
    data: {
      ...params
    },
  });
}

export async function update(params: RoleModel) {
  return request('/api/role/update', {
    method: 'POST',
    data: {
      ...params
    },
  });
}
