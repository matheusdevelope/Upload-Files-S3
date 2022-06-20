import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Manager {
  @PrimaryColumn()
  id: string;

  @Column({
    unique: true,
  })
  user: string;

  @Column()
  pass: string;

  @Column()
  name: string;

  @Column()
  access: number;
}
