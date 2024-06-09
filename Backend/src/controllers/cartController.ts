import { Request, Response } from "express";
import {
  getCartByUserId,
  getCarts,
  deletecartByUserId,
  addToCart,
} from "../services/cartService";
import { getUserById } from "../services/userService";
import { getProductById } from "../services/productService";
import Logger from "../lib/logger";

const isEmptyObject = (obj: object): boolean => {
  return Object.entries(obj).length === 0;
};

const addToCartHandeler = async (req: Request, res: Response) => {
  try {
    const user = await getUserById(Number(req.params.userId));
    const product = await getProductById(Number(req.params.productId));
    if (user && product) {
      const cart = await addToCart(
        Number(req.params.userId),
        Number(req.params.productId),
        Number(req.params.amountId)
      );
      if (!isEmptyObject(cart)) {
        res.status(200).json(cart);
        Logger.info(
          `product ${req.params.productId} was added to cart of  user with the id ${req.params.userId}`
        );
      } else {
        res
          .status(400)
          .json({ message: `there is not enough of the product in stock` });
        Logger.info(`there is not enough of the product in stock`);
      }
    } else {
      res.status(404).json({ message: `user or product was not found` });
      Logger.info(`user or product was not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    Logger.error(`${error}: ${error.message}`);
  }
};

const getCartsHandeler = async (req: Request, res: Response) => {
  try {
    const carts = await getCarts();

    res.status(200).json(carts);
    Logger.info(`${carts.length} carts were found`);
  } catch (error) {
    res.status(500).json({ error: error.message });
    Logger.error(`${error}: ${error.message}`);
  }
};

const getCartByUserIdHandeler = async (req: Request, res: Response) => {
  try {
    const user = await getUserById(Number(req.params.id));
    if (user) {
      const cart = await getCartByUserId(Number(req.params.id));
      res.status(200).json(cart);
      Logger.info(`cart of the user with the id ${req.params.id} was found`);
    } else {
      res
        .status(404)
        .json({ message: `user with the id ${req.params.id} was not found` });
      Logger.info(`user with the id ${req.params.id} was not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    Logger.error(`${error}: ${error.message}`);
  }
};

const deletecartByUserIdHandeler = async (req: Request, res: Response) => {
  try {
    const user = await getUserById(Number(req.params.id));
    if (user) {
      const cart = await deletecartByUserId(Number(req.params.id));
      res.status(200).json({
        message: `cart of user with the id ${req.params.id} was deleted`,
      });
      Logger.info(`cart of user with the id ${req.params.id} was deleted`);
    } else {
      res
        .status(404)
        .json({ message: `user with the id ${req.params.id} was not found` });
      Logger.info(`user with the id ${req.params.id} was not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    Logger.error(`${error}: ${error.message}`);
  }
};

// const updateUserByIdHandeler = async (req: Request, res: Response) => {
//   try {
//     const user = await updateUserById(Number(req.params.id), req.body);
//     if (user) {
//       res
//         .status(200)
//         .json({ message: `user with the id ${req.params.id} was updated` });
//         Logger.info("`user with the id ${req.params.id} was updated` ");
//     } else {
//       res.status(404).json({ message: `user with the id ${req.params.id} was not found` });
//       Logger.info(`user with the id ${req.params.id} was not found`);
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//     Logger.error(`${error}: ${error.message}`);
//   }
// };

// export {
//   getUsersHandeler,
//   addUsersHandeler,
//   getUserByIdHandeler,
//   deleteUserByIdHandeler,
//   updateUserByIdHandeler,
// };

export {
  getCartByUserIdHandeler,
  getCartsHandeler,
  deletecartByUserIdHandeler,
  addToCartHandeler
};
