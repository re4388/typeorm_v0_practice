import "reflect-metadata";
import { DataSource } from "typeorm";
import { Photo } from "./entity/Photo";
import { PhotoMetadata } from "./entity/PhotoMetadata";
import { User } from "./entity/User";
import { Author } from "./entity/Author";
import { Album } from "./entity/Album";
import { Category } from "./entity/Category";
import { Question } from "./entity/Question";
import path = require("path");
import { User2 } from "./entity/User2";
import { Photo2 } from "./entity/Photo2";
import { Group } from "./entity/Group";
import { User3 } from "./entity/User3";
import { Rent } from "./entity/Rent";
import { RentPhoto } from "./entity/RentPhoto";
import { Company } from "./entity/Company";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5444,
  username: "postgres",
  password: "postgres",
  database: "typeorm_v0",
  synchronize: true,
  logging: true,
  // entities: [
  //     path.join(
  //         __dirname,
  //         process.env.NODE_ENV === 'development' ?
  //             '/**/*.entity{.ts,.js}' :
  //             '/**/*.entity.js',
  //     ),
  // ],
  entities: [
    User2,
    Photo2,
    User,
    Photo,
    PhotoMetadata,
    Author,
    Album,
    Category,
    Question,
    Group,
    User3,
    RentPhoto,
    Rent,
    Company,
  ],
  migrations: [],
  subscribers: [],
  // feature2
});
