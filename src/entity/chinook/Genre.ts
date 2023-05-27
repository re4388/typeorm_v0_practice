import { Column, Entity, Index, OneToMany } from "typeorm";
import { Track } from "./Track";

@Index("PK_Genre", ["genreId"], { unique: true })
@Entity("Genre", { schema: "public" })
export class Genre {
  @Column("integer", { primary: true, name: "GenreId" })
  genreId: number;

  @Column("character varying", { name: "Name", nullable: true, length: 120 })
  name: string | null;

  @OneToMany(() => Track, (track) => track.genre)
  tracks: Track[];
}
