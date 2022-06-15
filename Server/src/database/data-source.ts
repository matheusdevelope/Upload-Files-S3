import "reflect-metadata";
import { DataSource } from "typeorm";
import Config from "../configs";
console.log(Config);
export const AppDataSource = new DataSource({
  type: "mysql",
  url: Config.DB_URL,
  // port: Config.DB_PORT,
  // host: Config.DB_HOST,
  // username: Config.DB_USER,
  // password: Config.DB_PASS,
  //database: Config.DB_NAME || "",
  //ssl: true,

  synchronize: true,
  logging: false,
  entities: [__dirname + "/entity/**/*.{js,ts}"],
  migrations: [__dirname + "/migration/**/*.{js,ts}"],
  subscribers: [],
});

//'mysql://hvngfbnqfk2s:************@fm5gfblk33ym.us-east-2.psdb.cloud/whatsapi?ssl={"rejectUnauthorized":true}'
