import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Product } from "./productEntity";
import { User } from "./userEntity";

@Entity("cart")
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.carts) user: User;

  @ManyToOne((type) => Product, (product) => product.carts) product: Product;

  @Column()
  quantity: number;


}
