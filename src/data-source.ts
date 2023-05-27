import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5444,
  username: "postgres",
  password: "postgres",
  database: "typeorm_v0",
  synchronize: true,
  logging: true,
  entities: [`${__dirname}/entity/**/*{.ts,.js}`],
  migrations: [],
  subscribers: [],
});
