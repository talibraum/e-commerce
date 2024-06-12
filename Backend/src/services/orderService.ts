import { getRepository } from "typeorm";
import { Order } from "../models/orderEntity";
import { Cart } from "../models/cartEntity";
import { OrderLine } from "../models/orderLineEntity";
import { getUserById } from "./userService";
import { getTotalPriceOfCart, deletecartByUserId } from "./cartService";

const getOrderByUserId = async (
  userId: number
): Promise<Order[] | undefined> => {
  const orderRepository = getRepository(Order);
  return orderRepository.find({
    where: {
      user: {
        id: userId,
      },
    },
    relations: ["status", "products.product"],
  });
};
const createOrder = async (cartOfUser: Cart[], userId: number) => {
  const newOrder = await addOrder(
    await getTotalPriceOfCart(cartOfUser),
    userId
  );
  for (const cart of cartOfUser) {
    await addOrderLine(cart, newOrder.id);
  }
  await deletecartByUserId(userId);

  return newOrder;
};

const addOrderLine = async (cart: Cart, orderId: number) => {
  const orderLineRepository = getRepository(OrderLine);
  let orderLine = new OrderLine();
  orderLine.orderId = orderId;
  orderLine.productId = cart.product.id;
  orderLine.quantity = cart.quantity;
  await orderLineRepository.save(orderLine);
};
const addOrder = async (price: number, userId: number) => {
  const orderRepository = getRepository(Order);
  let order = new Order();
  order.orderDate = new Date();
  order.statusId = 1;
  order.user = await getUserById(userId);
  order.total = price;
  return orderRepository.save(order);
};

const getOrderById = async (id: number): Promise<Order | undefined> => {
  const orderRepository = getRepository(Order);
  return orderRepository.findOne({
    where: {
      id: id,
    },
  });
};

const deleteOrderById = async (id: number): Promise<Order | undefined> => {
  const order = await getOrderById(id);
  if (order) {
    const orderRepository = getRepository(Order);
    await orderRepository.remove(order);
  }

  return order;
};

const updateStatusOfOrder = async (
  id: number,
  statusId: number
): Promise<Order | undefined> => {
  const orderToUpdate = await getOrderById(id);
  if (orderToUpdate) {
    orderToUpdate.statusId = statusId;
    const orderRepository = getRepository(Order);
    await orderRepository.update(id, orderToUpdate);
  }

  return orderToUpdate;
};
export { getOrderByUserId, createOrder, deleteOrderById , updateStatusOfOrder};
