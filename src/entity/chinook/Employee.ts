import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Customer } from "./Customer";

@Index("PK_Employee", ["employeeId"], { unique: true })
@Index("IFK_EmployeeReportsTo", ["reportsTo"], {})
@Entity("Employee", { schema: "public" })
export class Employee {
  @Column("integer", { primary: true, name: "EmployeeId" })
  employeeId: number;

  @Column("character varying", { name: "LastName", length: 20 })
  lastName: string;

  @Column("character varying", { name: "FirstName", length: 20 })
  firstName: string;

  @Column("character varying", { name: "Title", nullable: true, length: 30 })
  title: string | null;

  @Column("integer", { name: "ReportsTo", nullable: true })
  reportsTo: number | null;

  @Column("timestamp without time zone", { name: "BirthDate", nullable: true })
  birthDate: Date | null;

  @Column("timestamp without time zone", { name: "HireDate", nullable: true })
  hireDate: Date | null;

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

  @Column("character varying", { name: "Email", nullable: true, length: 60 })
  email: string | null;

  @OneToMany(() => Customer, (customer) => customer.supportRep)
  customers: Customer[];

  @ManyToOne(() => Employee, (employee) => employee.employees)
  @JoinColumn([{ name: "ReportsTo", referencedColumnName: "employeeId" }])
  reportsTo2: Employee;

  @OneToMany(() => Employee, (employee) => employee.reportsTo2)
  employees: Employee[];
}
