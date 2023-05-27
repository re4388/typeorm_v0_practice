import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Invoice } from "./Invoice";
import { Track } from "./Track";

@Index("IFK_InvoiceLineInvoiceId", ["invoiceId"], {})
@Index("PK_InvoiceLine", ["invoiceLineId"], { unique: true })
@Index("IFK_InvoiceLineTrackId", ["trackId"], {})
@Entity("InvoiceLine", { schema: "public" })
export class InvoiceLine {
  @Column("integer", { primary: true, name: "InvoiceLineId" })
  invoiceLineId: number;

  @Column("integer", { name: "InvoiceId" })
  invoiceId: number;

  @Column("integer", { name: "TrackId" })
  trackId: number;

  @Column("numeric", { name: "UnitPrice", precision: 10, scale: 2 })
  unitPrice: string;

  @Column("integer", { name: "Quantity" })
  quantity: number;

  @ManyToOne(() => Invoice, (invoice) => invoice.invoiceLines)
  @JoinColumn([{ name: "InvoiceId", referencedColumnName: "invoiceId" }])
  invoice: Invoice;

  @ManyToOne(() => Track, (track) => track.invoiceLines)
  @JoinColumn([{ name: "TrackId", referencedColumnName: "trackId" }])
  track: Track;
}
