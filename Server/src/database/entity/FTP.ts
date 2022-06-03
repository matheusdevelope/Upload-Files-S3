import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class FTP {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  host: string;

  @Column()
  user: string;

  @Column()
  pass: string;
  @Column()
  port: number;

  @Column()
  path: string;

  @Column()
  deleteFiles: boolean;

  @Column()
  order: number;

  @ManyToOne(() => User, (user) => user.ftp, {
    onDelete: "CASCADE",
  })
  userId: User;
}
