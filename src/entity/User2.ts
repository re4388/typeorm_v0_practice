import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Photo2 } from "./Photo2"

@Entity()
export class User2 {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany((type) => Photo2, (photo2) => photo2.user)
    photos: Photo2[]
}