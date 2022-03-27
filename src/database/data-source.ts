import "reflect-metadata";
import { DataSource } from "typeorm";
import Config from "../configs";

export const AppDataSource = new DataSource({
  type: "mssql",
  port: Config.DB_PORT,
  host: Config.DB_HOST,
  username: Config.DB_USER,
  password: Config.DB_PASS,
  database: Config.DB_NAME,
  synchronize: false,
  logging: false,
  entities: ["src/database/entity/**/*.ts"],
  migrations: ["src/database/migration/**/*.ts"],
  subscribers: [],
});
