import { getRepository } from "typeorm";
import { Cart } from "../models/cartEntity";
import { Product } from "../models/productEntity";
import { subtractStockOfProduct, getProductById } from "./productService";
import { getUserById } from "./userService";
import { DeleteResult } from "typeorm";

const getCartByUserId = async (userId: number): Promise<Cart[] | undefined> => {
  const cartRepository = getRepository(Cart);
  return cartRepository.find({
    relations: {
      user: false,
      product: true,
    },
    where: {
      user: {
        id: userId,
      },
    },
  });
};

const getCarts = async (): Promise<Cart[]> => {
  const cartRepository = getRepository(Cart);
  return cartRepository.find({ relations: ["user", "product"] });
};

const getTotalPriceOfCart =  (carts:Cart[]): number => {
  return carts.reduce((acc, num) => acc + num.quantity*num.product.price, 0);
};

const addToCart = async (
  userId: number,
  productId: number,
  amountToAdd: number
) => {
  const cartRepository = getRepository(Cart);
  let cart = new Cart();
  const product = await subtractStockOfProduct(productId, amountToAdd);
  if (product) {
    cart.product = await getProductById(productId);
    cart.user = await getUserById(userId);
    cart.quantity = amountToAdd;
    await cartRepository.save(cart);
  }

  return cart;
};

const deletecartByUserId = async (userId: number): Promise<DeleteResult> => {
  const cartRepository = getRepository(Cart);
  const deleteCart = await cartRepository
    .createQueryBuilder("cart")
    .delete()
    .from(Cart)
    .where("userId = :userId", { userId })
    .execute();
  return deleteCart;
};

const deleteProductFromCart = async (userId: number, productId: number) => {
  const cartRepository = getRepository(Cart);
  const cart = await cartRepository.findOne({
    where: {
      user: { id: userId },
      product: { id: productId },
    },
  });

  if (cart) {
    cartRepository.remove(cart);
  }
  return cart

 
};

export {
  getCartByUserId,
  getCarts,
  deletecartByUserId,
  addToCart,
  deleteProductFromCart,
  getTotalPriceOfCart
};
