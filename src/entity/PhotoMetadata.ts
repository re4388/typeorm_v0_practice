import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    Relation,
} from "typeorm"
import { Photo } from "./Photo"

@Entity()
export class PhotoMetadata {
    @PrimaryGeneratedColumn()
    id: number

    @Column("int")
    height: number

    @Column("int")
    width: number

    @Column()
    orientation: string

    @Column()
    compressed: boolean

    @Column()
    comment: string


    // @JoinColumn decorator on will be the owning side of the relationship. 
    // The owning side of a relationship contains a column with a foreign key in the database.
    // we will have an photoId (int) as FOREIGN KEY in PhotoMetadata table
    @OneToOne(() => Photo, (photo) => photo.metadata)
    @JoinColumn()
    photo: Relation<Photo>
    // feature2
}

// id|height|width|orientation|compressed|comment     |photoId|
// --+------+-----+-----------+----------+------------+-------+
//  1|   640|  480|CCportrait |true      |CCcybershoot|      4|
//  2|   640|  480|ZZportrait |true      |ZZcybershoot|      6|