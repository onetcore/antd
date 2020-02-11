import request from '@/utils/request';
import { DataResult } from '@/models/result.d';
import { CreateUserModel, UpdateUserModel, UserQuery, PageData, LockoutUserModel } from './model.d';

export async function query(params?: UserQuery): Promise<PageData> {
  return request<PageData>('/api/users', {
    params,
  });
}

export async function remove(ids: number[]) {
  return request('/api/users/remove', {
    method: 'POST',
    data: ids,
  });
}

export async function create(params: CreateUserModel) {
  return request('/api/user/create', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function update(params: UpdateUserModel) {
  return request('/api/user/update', {
    method: 'POST',
    data: {
      ...params
    },
  });
}

export async function find(id: number): Promise<DataResult<UpdateUserModel>> {
  return request(`/api/user/get-update?id=${id}`);
}

export async function lockout(params: LockoutUserModel) {
  return request('/api/users/lockout', {
    method: 'POST',
    data: { ...params }
  });
}

export async function unlock(ids: number[]) {
  return request('/api/users/unlock', {
    method: 'POST',
    data: ids
  });
}