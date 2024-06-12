const Router = require("express");
import {
  getOrderByUserIdHandeler,
  createOrderHandeler,
  deleteOrderByIdHandeler,
  updateStatusOfOrderHandeler
} from "../controllers/orderController";
const router = Router();

router.get("/:id", getOrderByUserIdHandeler);

router.delete("/:id", deleteOrderByIdHandeler);

router.put("/:id/status/:statusId",updateStatusOfOrderHandeler)

router.post("/:id", createOrderHandeler);

module.exports = router;
