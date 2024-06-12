import { Request, Response } from "express";
import { getOrderByUserId, createOrder ,deleteOrderById,updateStatusOfOrder} from "../services/orderService";
import { getUserById } from "../services/userService";
import { getCartByUserId } from "../services/cartService";
import Logger from "../lib/logger";

const getOrderByUserIdHandeler = async (req: Request, res: Response) => {
  try {
    const user = await getUserById(Number(req.params.id));
    if (user) {
      const order = await getOrderByUserId(Number(req.params.id));
      res.status(200).json(order);
      Logger.info(
        `found ${order.length} orders of user with the id ${req.params.id} was found`
      );
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

const createOrderHandeler = async (req: Request, res: Response) => {
  try {
    const user = await getUserById(Number(req.params.id));
    if (user) {
      const cart = await getCartByUserId(Number(req.params.id));
      if (cart.length > 0) {
        const order = await createOrder(cart, Number(req.params.id));
        res.status(201).json(order);
        Logger.info(`user with the id ${req.params.id} created new order`);
      } else {
        res.status(400).json({
          message: `cart of the user with the id  ${req.params.id} is empty`,
        });
        Logger.info(`cart of the user with the id  ${req.params.id} is empty`);
      }
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

const deleteOrderByIdHandeler = async (req: Request, res: Response) => {
    try {
      const order = await deleteOrderById(Number(req.params.id));
      if (order) {
        res
          .status(200)
          .json({ message: `order with the id ${req.params.id} was deleted` });
          Logger.info(`order with the id ${req.params.id} was deleted`);
          
      } else {
        res.status(404).json({ message: `order with the id ${req.params.id} was not found` });
        Logger.info(`order with the id ${req.params.id} was not found`);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
      Logger.error(`${error}: ${error.message}`);
    }
  };

  const updateStatusOfOrderHandeler = async (req: Request, res: Response) => {
    try {
      const order = await updateStatusOfOrder(Number(req.params.id), Number(req.params.statusId));
      if (order) {
        res
          .status(200)
          .json({ message: `order with the id ${req.params.id} was updated` });
          Logger.info(`order with the id ${req.params.id} was updated` );
      } else {
        res.status(404).json({ message: `order with the id ${req.params.id} was not found` });
        Logger.info(`order with the id ${req.params.id} was not found`);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
      Logger.error(`${error}: ${error.message}`);
    }
  };

export { getOrderByUserIdHandeler, createOrderHandeler ,deleteOrderByIdHandeler ,updateStatusOfOrderHandeler};
