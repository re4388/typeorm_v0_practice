import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number
}

// id|firstName|lastName|age|
// --+---------+--------+---+
//  1|Timber   |Saw     | 25|
//  2|Timber2  |Saw2    |  2|