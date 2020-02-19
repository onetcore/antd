import request from '@/utils/request';
import { DataResult, Result } from '@/models/result.d';
import { CreateUserModel, UpdateUserModel, UserQuery, PageData, LockoutUserModel } from './model.d';

export async function query(params?: UserQuery): Promise<PageData> {
  return request('/api/admin/users', {
    params,
  });
}

export async function remove(ids: number[]): Promise<Result> {
  return request('/api/admin/users/remove', {
    method: 'POST',
    data: ids,
  });
}

export async function create(params: CreateUserModel): Promise<Result> {
  return request('/api/admin/user/create', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function update(params: UpdateUserModel): Promise<Result> {
  return request('/api/admin/user/update', {
    method: 'POST',
    data: {
      ...params
    },
  });
}

export async function find(id: number): Promise<DataResult<UpdateUserModel>> {
  return request(`/api/admin/user/get-update?id=${id}`);
}

export async function lockout(params: LockoutUserModel) {
  return request('/api/admin/users/lockout', {
    method: 'POST',
    data: { ...params }
  });
}

export async function unlock(ids: number[]) {
  return request('/api/admin/users/unlock', {
    method: 'POST',
    data: ids
  });
}