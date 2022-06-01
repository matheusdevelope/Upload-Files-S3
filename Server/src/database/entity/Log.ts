import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Log {
  @PrimaryColumn()
  id: string;

  @Column()
  requester: string;

  @Column()
  type: string;

  @Column()
  sector: string;

  @Column()
  error: string;

  @Column({ type: "timestamptz" })
  created_at: Date;
}
