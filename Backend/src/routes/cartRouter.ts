const Router = require("express");
import {
  getCartByUserIdHandeler,
  getCartsHandeler,
  deletecartByUserIdHandeler,
  addToCartHandeler,
  deleteProductFromCartHandeler
} from "../controllers/cartController";
const router = Router();

router.get("/", getCartsHandeler);

router.get("/:id", getCartByUserIdHandeler);

router.delete("/:id", deletecartByUserIdHandeler);

router.delete("/user/:userId/product/:productId", deleteProductFromCartHandeler);


router.post(
  "/user/:userId/product/:productId/:amountId",
  addToCartHandeler
);

module.exports = router;
