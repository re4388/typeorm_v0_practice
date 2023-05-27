import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User2 } from "./User2";

@Entity()
export class Photo2 {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne((type) => User2, (user2) => user2.photos)
  user: User2;
}
