/**
 * 角色模型。
 */
export interface RoleModel {
  /**
   * 角色Id。
   */
  id: number;
  /**
   * 角色名称。
   */
  name: string;
  /**
   * 显示颜色。
   */
  color?: string;
  /**
   * 图标地址或者样式。
   */
  iconUrl?: string;
  /**
   * 是否为系统，后台管理角色。
   */
  isSystem: boolean;
  /**
   * 默认角色，所有添加的用户都自动添加的角色。
   */
  isDefault: boolean;
}