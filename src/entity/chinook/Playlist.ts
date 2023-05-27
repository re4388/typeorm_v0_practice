import { Column, Entity, Index, JoinTable, ManyToMany } from "typeorm";
import { Track } from "./Track";

@Index("PK_Playlist", ["playlistId"], { unique: true })
@Entity("Playlist", { schema: "public" })
export class Playlist {
  @Column("integer", { primary: true, name: "PlaylistId" })
  playlistId: number;

  @Column("character varying", { name: "Name", nullable: true, length: 120 })
  name: string | null;

  @ManyToMany(() => Track, (track) => track.playlists)
  @JoinTable({
    name: "PlaylistTrack",
    joinColumns: [{ name: "PlaylistId", referencedColumnName: "playlistId" }],
    inverseJoinColumns: [{ name: "TrackId", referencedColumnName: "trackId" }],
    schema: "public",
  })
  tracks: Track[];
}
