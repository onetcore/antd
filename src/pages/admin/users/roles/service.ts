import request from '@/utils/request';
import { RoleModel } from './data';

export async function query() {
  return request('/api/roles');
}

export async function remove(params: { key: number[] }) {
  return request('/api/roles/remove', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function create(params: RoleModel) {
  return request('/api/role/create', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function update(params: RoleModel) {
  return request('/api/role/update', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
