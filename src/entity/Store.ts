import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Address } from "./Address";
import { Staff } from "./Staff";

@Index("idx_unq_manager_staff_id", ["managerStaffId"], { unique: true })
@Index("store_pkey", ["storeId"], { unique: true })
@Entity("store", { schema: "public" })
export class Store {
  @PrimaryGeneratedColumn({ type: "integer", name: "store_id" })
  storeId: number;

  @Column("smallint", { name: "manager_staff_id" })
  managerStaffId: number;

  @Column("timestamp without time zone", {
    name: "last_update",
    default: () => "now()",
  })
  lastUpdate: Date;

  @ManyToOne(() => Address, (address) => address.stores, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "address_id", referencedColumnName: "addressId" }])
  address: Address;

  @OneToOne(() => Staff, (staff) => staff.store, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "manager_staff_id", referencedColumnName: "staffId" }])
  managerStaff: Staff;
}
