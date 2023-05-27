import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Customer } from "./Customer";
import { InvoiceLine } from "./InvoiceLine";

@Index("IFK_InvoiceCustomerId", ["customerId"], {})
@Index("PK_Invoice", ["invoiceId"], { unique: true })
@Entity("Invoice", { schema: "public" })
export class Invoice {
  @Column("integer", { primary: true, name: "InvoiceId" })
  invoiceId: number;

  @Column("integer", { name: "CustomerId" })
  customerId: number;

  @Column("timestamp without time zone", { name: "InvoiceDate" })
  invoiceDate: Date;

  @Column("character varying", {
    name: "BillingAddress",
    nullable: true,
    length: 70,
  })
  billingAddress: string | null;

  @Column("character varying", {
    name: "BillingCity",
    nullable: true,
    length: 40,
  })
  billingCity: string | null;

  @Column("character varying", {
    name: "BillingState",
    nullable: true,
    length: 40,
  })
  billingState: string | null;

  @Column("character varying", {
    name: "BillingCountry",
    nullable: true,
    length: 40,
  })
  billingCountry: string | null;

  @Column("character varying", {
    name: "BillingPostalCode",
    nullable: true,
    length: 10,
  })
  billingPostalCode: string | null;

  @Column("numeric", { name: "Total", precision: 10, scale: 2 })
  total: string;

  @ManyToOne(() => Customer, (customer) => customer.invoices)
  @JoinColumn([{ name: "CustomerId", referencedColumnName: "customerId" }])
  customer: Customer;

  @OneToMany(() => InvoiceLine, (invoiceLine) => invoiceLine.invoice)
  invoiceLines: InvoiceLine[];
}
