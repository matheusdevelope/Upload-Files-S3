import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { FTP } from "./FTP";

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  cnpj: string;

  @Column()
  name: string;

  @Column()
  expiration_files: number;

  @Column()
  allow_access: boolean;

  @OneToMany(() => FTP, (ftp) => ftp.userId, { cascade: true })
  ftp: FTP[];
}
