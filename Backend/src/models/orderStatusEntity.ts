import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity("order_status")
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

}
