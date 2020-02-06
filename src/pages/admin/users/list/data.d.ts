import { DataPagination } from '@/models/page';
/**
 * 用户查询实例。
 */
export interface UserQuery {
  /**
   * 用户名称。
   */
  name?: string;
  /**
   * 注册时间。
   */
  start?: Date;
  /**
   * 注册结束时间。
   */
  end?: Date;
  /**
   * 登录时间。
   */
  loginStart?: Date;
  /**
   * 登录结束时间。
   */
  loginEnd?: Date;
  /**
   * 电子邮件。
   */
  email?: string;
  /**
   * 电话号码。
   */
  phoneNumber?: string;
}

export interface UserModel extends UserQuery {
  id: number;
  userName: string;
  realName?: string;
  createdIP?: string;
  loginIP?: string;
  roleName: string;
  lastLoginDate?: Date;
}

export interface PageData extends DataPagination<UserModel> {

}

export interface TableListItem {
  key: number;
  disabled?: boolean;
  href: string;
  avatar: string;
  name: string;
  title: string;
  owner: string;
  desc: string;
  callNo: number;
  status: number;
  updatedAt: Date;
  createdAt: Date;
  progress: number;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
