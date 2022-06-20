import { resolve } from "path";
import "reflect-metadata";
import { DataSource } from "typeorm";
export const AppDataSource = new DataSource({
  type: "sqlite",
  database: resolve(__dirname, "database.sqlite"),
  synchronize: true,
  logging: false,
  entities: [__dirname + "/entity/**/*.{js,ts}"],
  migrations: [__dirname + "/migration/**/*.{js,ts}"],
  subscribers: [],
});
