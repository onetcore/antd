import { DataPagination } from '@/models/result';
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

  [key: string]: any;
}

export interface UserModel extends UserQuery {
  id: number;
  userName: string;
  nickName?: string;
  createdIP?: string;
  loginIP?: string;
  roleName: string;
  lastLoginDate?: Date;
  lockoutEnd?: Date;
  lockoutEnabled: boolean;
}

export interface PageData extends DataPagination<UserModel> {

}

export interface CreateUserModel {
  userName: string;
  nickName?: string;
  password: string;
  confirm: string;
  email?: string;
  phoneNumber?: string;
  summary?: string;
}

export interface UpdateUserModel extends CreateUserModel {
  id: number;
  lockoutEnabled: boolean;
}

export interface LockoutUserModel {
  ids: number[];
  lockoutEnd?: Date;
}