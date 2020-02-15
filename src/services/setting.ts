import request from '@/utils/request';
import { SiteSettings } from '../../config/siteSettings';

/**
 * 获取网站配置。
 */
export async function getSetting(): Promise<SiteSettings> {
    return request('/api/setting');
}

/**
 * 保存配置。
 * @param params {SiteSettings} 网站配置类型。
 */
export async function saveSetting(params: SiteSettings) {
    return request('/api/admin/setting/save', {
      method: 'POST',
      data: params,
    });
  }