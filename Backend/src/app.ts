const express = require("express");
const app = express();
const port = 3000;
const userRouter = require("./routes/userRouter.ts");
import { createConnection } from "typeorm";
import { json } from "body-parser";

app.use(json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", userRouter);

createConnection().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
