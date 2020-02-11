/**
 * 配置模型。
 */
export interface SettingsModel {
    /**
     * 是否需要电子邮件确认。
     */
    requiredEmailConfirmed: boolean;
    /**
     * 是否需要电话号码确认。
     */
    requiredPhoneNumberConfirmed: boolean;
    /**
     * 开启二次验证。
     */
    requiredTwoFactorEnabled: boolean;
    /**
     * 开启注册。
     */
    registrable: boolean;
    /**
     * 登录成功后的转向。
     */
    loginDirection: LoginDirection;
    /**
     * 使用验证码。
     */
    validCode: boolean;
    /**
     * 登录页面的背景地址。
     */
    loginBg: string;
}

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