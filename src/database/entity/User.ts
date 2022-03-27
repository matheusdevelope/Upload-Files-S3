import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  user: string;

  @Column()
  pass: string;

  @Column()
  name: number;

  @Column()
  access: number;
}
