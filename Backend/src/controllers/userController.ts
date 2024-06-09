import { Request, Response } from "express";
import {
  getUsers,
  addUser,
  getUserById,
  deleteUserById,
  updateUserById,
} from "../services/userService";
import Logger from "../lib/logger";

const getUsersHandeler = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
    Logger.info(`${users.length} users were found`);
  } catch (error) {
    res.status(500).json({ error: error.message });
    Logger.error(`${error}: ${error.message}`);
  }
};

const addUsersHandeler = async (req: Request, res: Response) => {
  try {
    const user = await addUser(req.body);
    res.status(201).json(user);
    Logger.info(`user was added`);
  } catch (error) {
    res.status(500).json({ error: error.message });
    Logger.error(`${error}: ${error.message}`);
  }
};

const getUserByIdHandeler = async (req: Request, res: Response) => {
  try {
    const user = await getUserById(Number(req.params.id));
    if (user) {
      res.status(200).json(user);
      Logger.info(`user with the id ${req.params.id} was found`);
    } else {
      res.status(404).json({ message: `user with the id ${req.params.id} was not found` });
      Logger.info(`user with the id ${req.params.id} was not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    Logger.error(`${error}: ${error.message}`);
  }
};

const deleteUserByIdHandeler = async (req: Request, res: Response) => {
  try {
    const user = await deleteUserById(Number(req.params.id));
    if (user) {
      res
        .status(200)
        .json({ message: `user with the id ${req.params.id} was deleted` });
        Logger.info(`user with the id ${req.params.id} was deleted`);
        
    } else {
      res.status(404).json({ message: `user with the id ${req.params.id} was not found` });
      Logger.info(`user with the id ${req.params.id} was not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    Logger.error(`${error}: ${error.message}`);
  }
};

const updateUserByIdHandeler = async (req: Request, res: Response) => {
  try {
    const user = await updateUserById(Number(req.params.id), req.body);
    if (user) {
      res
        .status(200)
        .json({ message: `user with the id ${req.params.id} was updated` });
        Logger.info("`user with the id ${req.params.id} was updated` ");
    } else {
      res.status(404).json({ message: `user with the id ${req.params.id} was not found` });
      Logger.info(`user with the id ${req.params.id} was not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    Logger.error(`${error}: ${error.message}`);
  }
};

export {
  getUsersHandeler,
  addUsersHandeler,
  getUserByIdHandeler,
  deleteUserByIdHandeler,
  updateUserByIdHandeler,
};
