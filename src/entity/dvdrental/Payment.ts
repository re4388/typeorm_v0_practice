import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Customer } from "./Customer";
import { Rental } from "./Rental";
import { Staff } from "./Staff";

@Index("idx_fk_customer_id", ["customerId"], {})
@Index("payment_pkey", ["paymentId"], { unique: true })
@Index("idx_fk_rental_id", ["rentalId"], {})
@Index("idx_fk_staff_id", ["staffId"], {})
@Entity("payment", { schema: "public" })
export class Payment {
  @PrimaryGeneratedColumn({ type: "integer", name: "payment_id" })
  paymentId: number;

  @Column("smallint", { name: "customer_id" })
  customerId: number;

  @Column("smallint", { name: "staff_id" })
  staffId: number;

  @Column("integer", { name: "rental_id" })
  rentalId: number;

  @Column("numeric", { name: "amount", precision: 5, scale: 2 })
  amount: string;

  @Column("timestamp without time zone", { name: "payment_date" })
  paymentDate: Date;

  @ManyToOne(() => Customer, (customer) => customer.payments, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "customer_id", referencedColumnName: "customerId" }])
  customer: Customer;

  @ManyToOne(() => Rental, (rental) => rental.payments, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "rental_id", referencedColumnName: "rentalId" }])
  rental: Rental;

  @ManyToOne(() => Staff, (staff) => staff.payments, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "staff_id", referencedColumnName: "staffId" }])
  staff: Staff;
}
