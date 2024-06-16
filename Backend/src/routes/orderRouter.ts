const Router = require("express");
import {
  getOrderByUserIdHandeler,
  createOrderHandeler,
  deleteOrderByIdHandeler,
  updateStatusOfOrderHandeler
} from "../controllers/orderController";
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Operations related to orders
 */

/**
 * @swagger
 * /order/{id}:
 *   get:
 *     summary: Get order by user ID
 *     tags: [Orders]
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
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 */
router.get("/:id", getOrderByUserIdHandeler);

/**
 * @swagger
 * /order/{id}:
 *   delete:
 *     summary: Delete order by ID
 *     tags: [Orders]
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
 *         description: Order not found
 */
router.delete("/:id", deleteOrderByIdHandeler);

/**
 * @swagger
 * /order/{id}/status/{statusId}:
 *   put:
 *     summary: Update status of order
 *     tags: [Orders]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: statusId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 *       404:
 *         description: Order not found
 */
router.put("/:id/status/:statusId", updateStatusOfOrderHandeler);

/**
 * @swagger
 * /order/{id}:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Order created
 *       400:
 *         description: Bad request
 */
router.post("/:id", createOrderHandeler);

module.exports = router;
