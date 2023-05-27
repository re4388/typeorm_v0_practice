import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Artist } from "./Artist";
import { Track } from "./Track";

@Index("PK_Album", ["albumId"], { unique: true })
@Index("IFK_AlbumArtistId", ["artistId"], {})
@Entity("Album", { schema: "public" })
export class Album {
  @Column("integer", { primary: true, name: "AlbumId" })
  albumId: number;

  @Column("character varying", { name: "Title", length: 160 })
  title: string;

  @Column("integer", { name: "ArtistId" })
  artistId: number;

  @ManyToOne(() => Artist, (artist) => artist.albums)
  @JoinColumn([{ name: "ArtistId", referencedColumnName: "artistId" }])
  artist: Artist;

  @OneToMany(() => Track, (track) => track.album)
  tracks: Track[];
}
