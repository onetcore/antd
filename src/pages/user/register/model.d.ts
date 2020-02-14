export interface RegisterUserModel {
    userName: string;
    password: string;
    confirm: string;
    phoneNumber: string;
    captcha: string;
    email: string;
    inviteKey?: string;
}