const express = require("express");
const app = express();
const port = 3000;
const userRouter = require("./routes/userRouter.ts");
const productRouter = require("./routes/productRouter");
const cartRouter = require("./routes/cartRouter");
const orderRouter = require("./routes/orderRouter");
const cors = require("cors");
import { createConnection } from "typeorm";
import { json } from "body-parser";
app.use(json());
app.use(cors());
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);


createConnection().then(() => {
  app.listen(port, () => {
    console.log(` app listening on port ${port}`);
  });
});
