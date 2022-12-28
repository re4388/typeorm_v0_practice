import "reflect-metadata"
import { DataSource } from "typeorm"
import { Photo } from "./entity/Photo"
import { PhotoMetadata } from "./entity/PhotoMetadata"
import { User } from "./entity/User"
import { Author } from "./entity/Author"
import { Album } from "./entity/Album"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "123",
    database: "test0",
    synchronize: true,
    logging: true,
    entities: [User, Photo, PhotoMetadata, Author, Album],
    migrations: [],
    subscribers: [],
})
