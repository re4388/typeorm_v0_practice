import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
} from "typeorm"
import { Category } from "./Category"

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    text: string

    /**
     * @JoinTable() is required for @ManyToMany relations. 
     * You must put @JoinTable on one (owning) side of relation.
     */
    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[]
}