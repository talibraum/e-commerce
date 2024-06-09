import { Entity, PrimaryGeneratedColumn, Column, ManyToOne ,OneToMany} from "typeorm";
import { Color } from "./colorEntity";
import { Type } from "./typeEntity";
import { Cart } from "./cartEntity";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @ManyToOne((type) => Color, (color) => color.products) color: Color;

  @ManyToOne((type) => Type, (type) => type.products) type: Type;

  @OneToMany((type) => Cart, (cart) => cart.product) carts: Cart[];

}
