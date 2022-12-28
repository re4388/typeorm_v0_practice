import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    JoinColumn,
} from "typeorm"
import { Photo } from "./Photo"

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Photo, (photo) => photo.author)
    photos: Photo[]
    // feature2
}

// id|name|
// --+----+