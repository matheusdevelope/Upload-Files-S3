import { IFTP } from "./FTP";

export interface IUser {
  id: string | undefined;
  cnpj: string;
  name: string;
  expiration_files: number;
  allow_access: boolean;
  ftp: IFTP[];
}
