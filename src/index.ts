import express from "express";
import { UserController } from "./controllers/UserController";

const app = express();
const port = 3000;

const userController = new UserController();

app.post("/user", userController.create);

app.listen(port, () => {
  console.log(`Server started at http://127.0.0.1:${port}`);
});
