const Router = require("express");
import {
  getProductsHandeler,
  getProductsByColorHandeler,
  getProductsByTypeHandeler,
  addProductHandeler,
  getProductByIdHandeler,
  deleteproductByIdHandeler,
  updateProductByIdHandeler
} from "../controllers/productController";
import { getAllTypesHandeler } from "../controllers/typeController";
import { getAllColorsHandeler } from "../controllers/colorController";
const router = Router();

router.get("/", getProductsHandeler);
router.get("/types", getAllTypesHandeler);
router.get("/colors", getAllColorsHandeler);


router.get("/color/:id", getProductsByColorHandeler);

router.get("/type/:id", getProductsByTypeHandeler);

router.put("/:id",updateProductByIdHandeler);

router.get("/:id", getProductByIdHandeler);

router.delete("/:id", deleteproductByIdHandeler);

router.post("/", addProductHandeler);

module.exports = router;
