import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,OneToMany } from 'typeorm';
import { User } from "./userEntity";
import { OrderLine } from './orderLineEntity';
import { Status } from './orderStatusEntity';


@Entity('order' )
export class Order {
  @PrimaryGeneratedColumn()
  id: number;



  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany((type) => OrderLine, (orderLine) => orderLine.order) products: OrderLine[];




  @Column()
  total: number;

  @Column({ type: 'date' })
  orderDate: Date;

  

  @Column()
  statusId: number;

  @ManyToOne(() => Status)
  @JoinColumn({ name: 'statusId' })
  status: Status;
}
