const Router = require("express");
import {
  getCartByUserIdHandeler,
  getCartsHandeler,
  deletecartByUserIdHandeler,
  addToCartHandeler,
  deleteProductFromCartHandeler
} from "../controllers/cartController";
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Operations related to user carts
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get all carts
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cart'
 */
router.get("/", getCartsHandeler);

/**
 * @swagger
 * /cart/{id}:
 *   get:
 *     summary: Get cart by user ID
 *     tags: [Cart]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Cart not found
 */
router.get("/:id", getCartByUserIdHandeler);

/**
 * @swagger
 * /cart/{id}:
 *   delete:
 *     summary: Delete cart by user ID
 *     tags: [Cart]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: Cart not found
 */
router.delete("/:id", deletecartByUserIdHandeler);

/**
 * @swagger
 * /cart/user/{userId}/product/{productId}:
 *   delete:
 *     summary: Delete product from cart
 *     tags: [Cart]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: Product not found in cart
 */
router.delete("/user/:userId/product/:productId", deleteProductFromCartHandeler);

/**
 * @swagger
 * /cart/user/{userId}/product/{productId}/{amountId}:
 *   post:
 *     summary: Add product to cart
 *     tags: [Cart]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: amountId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Product added to cart
 *       400:
 *         description: Bad request
 */
router.post("/user/:userId/product/:productId/:amountId", addToCartHandeler);

module.exports = router;
