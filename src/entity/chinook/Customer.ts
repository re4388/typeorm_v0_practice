import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Employee } from "./Employee";
import { Invoice } from "./Invoice";

@Index("PK_Customer", ["customerId"], { unique: true })
@Index("IFK_CustomerSupportRepId", ["supportRepId"], {})
@Entity("Customer", { schema: "public" })
export class Customer {
  @Column("integer", { primary: true, name: "CustomerId" })
  customerId: number;

  @Column("character varying", { name: "FirstName", length: 40 })
  firstName: string;

  @Column("character varying", { name: "LastName", length: 20 })
  lastName: string;

  @Column("character varying", { name: "Company", nullable: true, length: 80 })
  company: string | null;

  @Column("character varying", { name: "Address", nullable: true, length: 70 })
  address: string | null;

  @Column("character varying", { name: "City", nullable: true, length: 40 })
  city: string | null;

  @Column("character varying", { name: "State", nullable: true, length: 40 })
  state: string | null;

  @Column("character varying", { name: "Country", nullable: true, length: 40 })
  country: string | null;

  @Column("character varying", {
    name: "PostalCode",
    nullable: true,
    length: 10,
  })
  postalCode: string | null;

  @Column("character varying", { name: "Phone", nullable: true, length: 24 })
  phone: string | null;

  @Column("character varying", { name: "Fax", nullable: true, length: 24 })
  fax: string | null;

  @Column("character varying", { name: "Email", length: 60 })
  email: string;

  @Column("integer", { name: "SupportRepId", nullable: true })
  supportRepId: number | null;

  @ManyToOne(() => Employee, (employee) => employee.customers)
  @JoinColumn([{ name: "SupportRepId", referencedColumnName: "employeeId" }])
  supportRep: Employee;

  @OneToMany(() => Invoice, (invoice) => invoice.customer)
  invoices: Invoice[];
}
