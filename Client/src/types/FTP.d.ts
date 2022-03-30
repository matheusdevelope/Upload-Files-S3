export interface IFTP {
  id?: string;
  host: string;
  user: string;
  pass: string;
  port: number;
  path: string;
  deleteFiles: boolean;
  order: number;
  userId?: string;
}
