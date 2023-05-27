import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { InvoiceLine } from "./InvoiceLine";
import { Playlist } from "./Playlist";
import { Album } from "./Album";
import { Genre } from "./Genre";
import { MediaType } from "./MediaType";

@Index("IFK_TrackAlbumId", ["albumId"], {})
@Index("IFK_TrackGenreId", ["genreId"], {})
@Index("IFK_TrackMediaTypeId", ["mediaTypeId"], {})
@Index("PK_Track", ["trackId"], { unique: true })
@Entity("Track", { schema: "public" })
export class Track {
  @Column("integer", { primary: true, name: "TrackId" })
  trackId: number;

  @Column("character varying", { name: "Name", length: 200 })
  name: string;

  @Column("integer", { name: "AlbumId", nullable: true })
  albumId: number | null;

  @Column("integer", { name: "MediaTypeId" })
  mediaTypeId: number;

  @Column("integer", { name: "GenreId", nullable: true })
  genreId: number | null;

  @Column("character varying", {
    name: "Composer",
    nullable: true,
    length: 220,
  })
  composer: string | null;

  @Column("integer", { name: "Milliseconds" })
  milliseconds: number;

  @Column("integer", { name: "Bytes", nullable: true })
  bytes: number | null;

  @Column("numeric", { name: "UnitPrice", precision: 10, scale: 2 })
  unitPrice: string;

  @OneToMany(() => InvoiceLine, (invoiceLine) => invoiceLine.track)
  invoiceLines: InvoiceLine[];

  @ManyToMany(() => Playlist, (playlist) => playlist.tracks)
  playlists: Playlist[];

  @ManyToOne(() => Album, (album) => album.tracks)
  @JoinColumn([{ name: "AlbumId", referencedColumnName: "albumId" }])
  album: Album;

  @ManyToOne(() => Genre, (genre) => genre.tracks)
  @JoinColumn([{ name: "GenreId", referencedColumnName: "genreId" }])
  genre: Genre;

  @ManyToOne(() => MediaType, (mediaType) => mediaType.tracks)
  @JoinColumn([{ name: "MediaTypeId", referencedColumnName: "mediaTypeId" }])
  mediaType: MediaType;
}
