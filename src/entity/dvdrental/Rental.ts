import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Payment } from "./Payment";
import { Customer } from "./Customer";
import { Inventory } from "./Inventory";
import { Staff } from "./Staff";

@Index(
  "idx_unq_rental_rental_date_inventory_id_customer_id",
  ["customerId", "inventoryId", "rentalDate"],
  { unique: true }
)
@Index("idx_fk_inventory_id", ["inventoryId"], {})
@Index("rental_pkey", ["rentalId"], { unique: true })
@Entity("rental", { schema: "public" })
export class Rental {
  @PrimaryGeneratedColumn({ type: "integer", name: "rental_id" })
  rentalId: number;

  @Column("timestamp without time zone", { name: "rental_date" })
  rentalDate: Date;

  @Column("integer", { name: "inventory_id" })
  inventoryId: number;

  @Column("smallint", { name: "customer_id" })
  customerId: number;

  @Column("timestamp without time zone", {
    name: "return_date",
    nullable: true,
  })
  returnDate: Date | null;

  @Column("timestamp without time zone", {
    name: "last_update",
    default: () => "now()",
  })
  lastUpdate: Date;

  @OneToMany(() => Payment, (payment) => payment.rental)
  payments: Payment[];

  @ManyToOne(() => Customer, (customer) => customer.rentals, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "customer_id", referencedColumnName: "customerId" }])
  customer: Customer;

  @ManyToOne(() => Inventory, (inventory) => inventory.rentals, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "inventory_id", referencedColumnName: "inventoryId" }])
  inventory: Inventory;

  @ManyToOne(() => Staff, (staff) => staff.rentals)
  @JoinColumn([{ name: "staff_id", referencedColumnName: "staffId" }])
  staff: Staff;
}
