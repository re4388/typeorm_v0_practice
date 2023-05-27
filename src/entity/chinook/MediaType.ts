import { Column, Entity, Index, OneToMany } from "typeorm";
import { Track } from "./Track";

@Index("PK_MediaType", ["mediaTypeId"], { unique: true })
@Entity("MediaType", { schema: "public" })
export class MediaType {
  @Column("integer", { primary: true, name: "MediaTypeId" })
  mediaTypeId: number;

  @Column("character varying", { name: "Name", nullable: true, length: 120 })
  name: string | null;

  @OneToMany(() => Track, (track) => track.mediaType)
  tracks: Track[];
}
