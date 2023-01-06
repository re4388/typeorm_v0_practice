import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Group } from "./Group";

@Entity()
export class User3 {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    // 一個 user 可以 own 很多個 group
    // 也因此，欄位在另一個 table
    // 亦即，另一個 table 的 owner上，每一個 row 上有一個 id (對應到這邊的id)
    @OneToMany(() => Group, (g) => g.owner)
    groups: Group[]
}

// table looks like:

// 注意：oneToMany 是對應另一個table 的 FK
// 因此，這裡不會有欄位

// id|name            |email                       |
// --+----------------+----------------------------+
//  1|Micheal.Haag    |Zane.Jaskolski54@hotmail.com|
//  2|Devonte.Mitchell|Otto89@gmail.com            |
//  3|Rosalinda_Boehm |Kane_Koch66@gmail.com       |