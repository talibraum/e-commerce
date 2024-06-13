import { getRepository } from "typeorm";
import { Cart } from "../models/cartEntity";
import { Product } from "../models/productEntity";
import { subtractStockOfProduct, getProductById ,addStockOfProduct} from "./productService";
import { getUserById } from "./userService";
import { DeleteResult } from "typeorm";

const isEmptyObject = (obj: object): boolean => {
  return Object.entries(obj).length === 0;
};

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

const getTotalPriceOfCart = (carts: Cart[]): number => {
  return carts.reduce((acc, num) => acc + num.quantity * num.product.price, 0);
};
const isProductAlreadyInCart = async (
  productId: number,
  userId: number,
  amountToAdd: number
) => {
  const carts = await getCartByUserId(userId);
  if(carts.length>0){
    const cart = carts.find((cart) => cart.product.id === productId);
  if (cart) {
    updateAmountInCart(amountToAdd, cart);
  }
  return cart;
  }
  return undefined
};

const updateAmountInCart = async (
  amountToAdd: number,
  cart: Cart
): Promise<Cart> => {
  const cartRepository = getRepository(Cart);
  cart.quantity = cart.quantity + amountToAdd;
  await cartRepository.update(cart.id, cart);
  return cart;
};

const addToCart = async (
  userId: number,
  productId: number,
  amountToAdd: number
) => {
  const cartRepository = getRepository(Cart);
  let cartToUpdate = await isProductAlreadyInCart(productId,userId, amountToAdd);
  const product = await subtractStockOfProduct(productId, amountToAdd);
  if (!cartToUpdate && product) {
    const cart=new Cart();
    cart.product = await getProductById(productId);
    cart.user = await getUserById(userId);
    cart.quantity = amountToAdd;
    return await cartRepository.save(cart);
  }

  return cartToUpdate;
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
    await addStockOfProduct(productId,cart.quantity)
    cartRepository.remove(cart);
  }
  return cart;
};

export {
  isEmptyObject,
  getCartByUserId,
  getCarts,
  deletecartByUserId,
  addToCart,
  deleteProductFromCart,
  getTotalPriceOfCart,
};
