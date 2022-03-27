import { Entity, Column, PrimaryColumn } from "typeorm";

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
}
