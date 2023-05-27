import { Column, Entity, Index, OneToMany } from "typeorm";
import { Album } from "./Album";

@Index("PK_Artist", ["artistId"], { unique: true })
@Entity("Artist", { schema: "public" })
export class Artist {
  @Column("integer", { primary: true, name: "ArtistId" })
  artistId: number;

  @Column("character varying", { name: "Name", nullable: true, length: 120 })
  name: string | null;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];
}
