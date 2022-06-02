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

  @Column("varchar", { length: 8000 })
  data: string;

  @Column()
  created_at: Date;
}
