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
      user: true,
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


export { getCartByUserId, getCarts, deletecartByUserId, addToCart };
