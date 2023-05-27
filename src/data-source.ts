import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5444,
  username: "postgres",
  password: "postgres",

  /**
   * we need to set it to false due to the way we setup our data
   * we directly import data into DB and then use typeorm-model-generator to
   * gen entities
   * So, they are not integrate from the start-up.
   * As a result: you don't have the all migration history to align your entities
   * to your DB data/objects. And if we turn-on synchronize, it will try to sync up
   * the code data into DB and which will cause duplicate-kind error since the DB
   * had already got those data
   *
   *
   * In the future, if you want to modify the DB structure, use migration
   *
   */
  synchronize: false,
  // database: "typeorm_v0",
  database: "dvdrental",
  // database: "chinook",
  logging: true,
  entities: [`${__dirname}/entity/**/*{.ts,.js}`],
  migrations: [],
  subscribers: [],
});
