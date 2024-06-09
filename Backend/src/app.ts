const express = require("express");
const app = express();
const port = 3000;
const userRouter = require("./routes/userRouter.ts");
const productRouter = require("./routes/productRouter");
const cartRouter = require("./routes/cartRouter")

import { createConnection } from "typeorm";
import { json } from "body-parser";
app.use(json());

app.use("/users", userRouter);
app.use("/products",productRouter);
app.use("/cart",cartRouter);

createConnection().then(() => {
  app.listen(port, () => {
    console.log(` app listening on port ${port}`);
  });
});
