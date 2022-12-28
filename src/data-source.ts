import "reflect-metadata"
import { DataSource } from "typeorm"
import { Photo } from "./entity/Photo"
import { PhotoMetadata } from "./entity/PhotoMetadata"
import { User } from "./entity/User"
import { Author } from "./entity/Author"
import { Album } from "./entity/Album"
import { Category } from "./entity/Category"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "123",
    database: "test0",
    synchronize: true,
    logging: true,
    entities: [User, Photo, PhotoMetadata, Author, Album, Category, Question],
    migrations: [],
    subscribers: [],
    // feature2
})
