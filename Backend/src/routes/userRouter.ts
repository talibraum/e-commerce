const Router = require("express");
import { createConnection, getRepository } from "typeorm";
import { User } from "../models/userEntity";
import {
  getUsersHandeler,
  addUsersHandeler,
  getUserByIdHandeler,
  deleteUserByIdHandeler,
  updateUserByIdHandeler
} from "../controllers/userController";
const router = Router();

router.get("/", getUsersHandeler);

router.put("/:id",updateUserByIdHandeler);

router.get("/:id", getUserByIdHandeler);

router.delete("/:id", deleteUserByIdHandeler);

router.post("/", addUsersHandeler);

module.exports = router;
