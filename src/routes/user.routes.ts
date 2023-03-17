import UserController from "@/controllers/user.controller";
import { Router } from "express";

export const userRouter = Router();

userRouter.get("/", UserController.all);
userRouter.get("/:id", UserController.getById);
userRouter.post("/", UserController.create);
userRouter.put("/:id", UserController.update);
userRouter.delete("/:id", UserController.delete);
