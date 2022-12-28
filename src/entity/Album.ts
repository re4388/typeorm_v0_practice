import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
} from "typeorm"
import { Photo } from "./Photo"

@Entity()
export class Album {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    // @JoinTable is for the owner side of the relationship.
    // many to many, will not have create new id in table
    // instead, ORM will create a album_photos_photo junction table
    @ManyToMany(() => Photo, (photo) => photo.albums)
    @JoinTable()
    photos: Photo[]
}

// id|name  |
// --+------+
//  1|XBears|
//  2|XMe   |

// 2 row(s) fetched.