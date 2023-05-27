import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Relation,
  ManyToOne,
  ManyToMany,
} from "typeorm";
import { Album } from "./Album";
import { Author } from "./Author";
import { PhotoMetadata } from "./PhotoMetadata";

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column("text")
  description: string;

  @Column()
  filename: string;

  @Column()
  views: number;

  @Column()
  isPublished: boolean;

  // cascade set to true, so when we want our related object to be saved whenever
  // the other object is saved
  @OneToOne(() => PhotoMetadata, (metadata) => metadata.photo, {
    cascade: true,
  })
  metadata: Relation<PhotoMetadata>;

  // In many-to-one / one-to-many relation, the owner side is always many-to-one.
  // It means that the class that uses @ManyToOne will store the id of the related object.
  // we will have an authorId (int) as FOREIGN KEY in photo table
  @ManyToOne(() => Author, (author) => author.photos)
  author: Author;

  @ManyToMany(() => Album, (album) => album.photos)
  albums: Album[];
}
//

// id|name           |description             |filename               |views|isPublished|authorId|
// --+---------------+------------------------+-----------------------+-----+-----------+--------+
//  2|Me and Bears222|I am near polar bears222|photo-with-bears222.jpg|    1|true       |        |
//  3|Bears333       |I am near polar 333     |photo-with-333.jpg     |    3|false      |        |
//  4|QQQMe and Bears|QQI am near polar bears |QQphoto-with-bears.jpg |    1|true       |        |
//  6|ZZMe and Bears |ZZI am near polar bears |ZZphoto-with-bears.jpg |   11|true       |        |
//  7|ZZMe and Bears |ZZI am near polar bears |ZZphoto-with-bears.jpg |   11|true       |        |
//  8|XMe and Bears  |XI am near polar bears  |X photo-with-bears.jpg |   21|true       |        |
