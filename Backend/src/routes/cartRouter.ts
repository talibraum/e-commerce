const Router = require("express");
import {
  getCartByUserIdHandeler,
  getCartsHandeler,
  deletecartByUserIdHandeler,
  addToCartHandeler,
} from "../controllers/cartController";
const router = Router();

router.get("/", getCartsHandeler);

router.get("/:id", getCartByUserIdHandeler);

router.delete("/:id", deletecartByUserIdHandeler);

router.post(
  "/add/user/:userId/product/:productId/:amountId",
  addToCartHandeler
);

module.exports = router;
