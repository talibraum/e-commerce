const express = require("express");
const app = express();
const port = 3000;
const userRouter = require("./routes/userRouter.ts");
const productRouter = require("./routes/productRouter");
const cartRouter = require("./routes/cartRouter");
const orderRouter = require("./routes/orderRouter");
const reviewRouter = require("./routes/reviewRouter");
const cors = require("cors");
import { createConnection } from "typeorm";
import { json } from "body-parser";

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for my project',
    },
  },
  apis: ['./routes/*.js', './routes/*.ts'], 
};


const specs = swaggerJsdoc(options);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(json());
app.use(cors());
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use("/review", reviewRouter);

createConnection().then(() => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});
