export interface IUserInfo {
    username: (null | string),
    password: (null | string)
}

export class UserInfo implements IUserInfo{
    username: (null | string);
    password: (null | string);
    
    constructor(username: (null | string), password: (null | string)) {
        this.username = username;
        this.password = password;
    }
}