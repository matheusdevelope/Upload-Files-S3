export interface IManager {
  id: string | undefined;
  user: string;
  pass: string;
  access: number;
  token?: string;
}

export interface IUserBodyAuth {
  user: string;
  pass: string;
}
