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
  synchronize: true,
  logging: false,
  entities: ["src/database/entity/**/*.ts"],
  migrations: ["src/database/migration/**/*.ts"],
  subscribers: [],
});

//'mysql://hvngfbnqfk2s:************@fm5gfblk33ym.us-east-2.psdb.cloud/whatsapi?ssl={"rejectUnauthorized":true}'
