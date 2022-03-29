export enum HolesUserLogin {
  all,
  readOnly,
}
export interface IUserLogin {
  user: string;
  pass: string;
  access: HolesUserLogin;
  logged: boolean;
}
