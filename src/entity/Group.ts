import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { User3 } from "./User3";


@Entity()
export class Group {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // 這邊定義 group 被那個 user own 
    @ManyToOne(() => User3, (user) => user.groups)
    @JoinColumn()
    owner: User3;
}

// table looks like:

// 注意：FK上面的 table name
// 會自動被標上 Id

// id|name   |ownerId|
// --+-------+-------+
//  1|#774850|      1|
//  2|#540a40|      1|
//  3|#297b79|      2|
//  4|#630b27|      2|
//  5|#766a2b|      3|
//  6|#066f5d|      3|