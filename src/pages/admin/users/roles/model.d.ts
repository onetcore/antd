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
}