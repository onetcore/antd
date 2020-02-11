import request from '@/utils/request';
import { SettingsModel } from './model.d';

export async function update(params: SettingsModel) {
  return request('/api/users/settings', {
    method: 'POST',
    data: params,
  });
}

export async function query(){
  return request('/api/users/get-settings');
}