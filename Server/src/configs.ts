import * as dotenv from "dotenv";
dotenv.config();
interface IConfig {
  DB_PORT: number;
  DB_HOST: string;
  DB_NAME: string;
  DB_USER: string;
  DB_PASS: string;
  PORT: number;
  SECRET_JWT: string;
  TEST_PORT: string;
}
const Config: IConfig = {
  DB_PORT: Number(process.env.DB_PORT),
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  PORT: Number(process.env.PORT) || 3000,
  SECRET_JWT: process.env.SECRET_JWT || "sdijfsfnklsdiorijjipeop",
  TEST_PORT: process.env.TEST_PORT,
};
export default Config;
