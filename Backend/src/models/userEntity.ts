import { Entity, PrimaryGeneratedColumn, Column ,OneToMany} from "typeorm";
import { Cart } from "./cartEntity";
@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @OneToMany((type) => Cart, (cart) => cart.user) carts: Cart[];

}
