const Router = require("express");

import {
  getUsersHandeler,
  addUsersHandeler,
  getUserByIdHandeler,
  deleteUserByIdHandeler,
  updateUserByIdHandeler,
  loginHandeler,
} from "../controllers/userController";
const router = Router();

router.get("/", getUsersHandeler);

router.put("/:id", updateUserByIdHandeler);

router.get("/:id", getUserByIdHandeler);
router.get("/login/:username/password/:password", loginHandeler);

router.delete("/:id", deleteUserByIdHandeler);

router.post("/", addUsersHandeler);

module.exports = router;
