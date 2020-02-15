import { MenuTheme } from 'antd/es/menu/MenuContext';

export type ContentWidth = 'Fluid' | 'Fixed';

/**
 * 登陆后的转向类型。
 */
export enum LoginDirection {
  /**
   *  首页。
   * */
  Default,
  /** 
   * 用户中心。
   * */
  Account,
  /** 
   * 后台管理。 
   * */
  Admin,
}

export interface SiteSettings {
  /**
   * theme for nav menu
   */
  navTheme: MenuTheme;
  /**
   * primary color of ant design
   */
  primaryColor: string;
  /**
   * nav menu position: `sidemenu` or `topmenu`
   */
  layout: 'sidemenu' | 'topmenu';
  /**
   * layout of content: `Fluid` or `Fixed`, only works when layout is topmenu
   */
  contentWidth: ContentWidth;
  /**
   * sticky header
   */
  fixedHeader: boolean;
  /**
   * auto hide header
   */
  autoHideHeader: boolean;
  /**
   * sticky siderbar
   */
  fixSiderbar: boolean;
  menu: { locale: boolean };
  title: string;
  pwa: boolean;
  // Your custom iconfont Symbol script Url
  // eg：//at.alicdn.com/t/font_1039637_btcrd5co4w.js
  // 注意：如果需要图标多色，Iconfont 图标项目里要进行批量去色处理
  // Usage: https://github.com/ant-design/ant-design-pro/pull/3517
  iconfontUrl: string;
  colorWeak: boolean;

  //其他配置属性
  description: string;
  shortName: string;
  [name: string]: any;
  /**
   * 是否需要电子邮件确认。
   */
  requiredEmailConfirmed: boolean;
  /**
   * 开启注册。
   */
  registrable: boolean;
  /**
   * 登录成功后的转向。
   */
  loginDirection: LoginDirection;
}

export default {
  navTheme: 'dark',
  // 拂晓蓝
  primaryColor: 'daybreak',
  layout: 'sidemenu',
  contentWidth: 'Fluid',
  fixedHeader: false,
  autoHideHeader: false,
  fixSiderbar: false,
  colorWeak: false,
  menu: {
    locale: true,
  },
  title: '云顶创联',
  pwa: false,
  iconfontUrl: '',
} as SiteSettings;
