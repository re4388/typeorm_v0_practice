import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Rent } from "./Rent";

@Entity("rent_photo")
export class RentPhoto {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "stage" })
  stage: RentPhotoStage;

  @Column("character varying", { name: "take" })
  take: RentPhotoTake;

  @Column("character varying", { name: "photo" })
  photo: string;

  @CreateDateColumn()
  createdAt: Date | null;

  @Column("timestamp without time zone", { name: "deletedAt", nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Rent, (rent) => rent.rentPhotos)
  @JoinColumn([{ name: "rentId", referencedColumnName: "id" }])
  rent: Rent;
}

export type RentPhotoStage = null | "rent" | "return";
export type RentPhotoTake =
  | null
  | "front-left"
  | "front-right"
  | "back-left"
  | "back-right"
  | "custom-1"
  | "custom-2";
