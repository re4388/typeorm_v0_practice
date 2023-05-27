import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RentPhoto } from "./RentPhoto";

@Entity({ name: "rent" })
export class Rent {
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  id: string;

  @Column({
    type: "int",
    nullable: true,
  })
  status: number | null;

  @Column({
    type: "char",
    length: 1,
    nullable: true,
    name: "his_flag",
  })
  hisFlag: string;

  @Column({
    type: "int",
    nullable: true,
    name: "user_id",
  })
  userId: number;

  @OneToMany(() => RentPhoto, (rentPhoto) => rentPhoto.rent)
  rentPhotos: RentPhoto[];
}
