import express from "express";

import { App } from "@/app";

import {
  responseHandler,
  errorHandler,
  pageNotFoundHandler,
} from "@/midlewares";

import { userRouter } from "@/routes";
import { Config } from "./config";
import { User } from "./models";
import { authRouter } from "./routes/auth.routes";

export const app: App = new App();

const env = process.env.NODE_ENV || "development";

app.registerDatabase({
  ...Config.get(env),
  entities: [User],
});

app.registerMiddlewares(express.json());

app.registerRoutes("/users", userRouter);
app.registerRoutes("/auth", authRouter);

app.registerMiddlewares(responseHandler);
app.registerMiddlewares(errorHandler);
app.registerMiddlewares(pageNotFoundHandler);

if (env == "development") {
  app.start(3000);
}
