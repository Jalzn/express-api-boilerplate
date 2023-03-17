import { UserService } from "@/services/user.service";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

export default class UserController {
  static async all(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = { ...req.query };

      const users = await UserService.all(filters);

      res.locals.statusCode = httpStatus.OK;
      res.locals.data = users;

      next();
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const user = await UserService.getById(id);

      res.locals.statusCode = httpStatus.OK;
      res.locals.data = user;

      next();
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await UserService.create({
        email: email,
        password: password,
      });

      res.locals.statusCode = httpStatus.CREATED;
      res.locals.data = user;

      next();
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const data = req.body

      const user = await UserService.update(id, data);

      res.locals.statusCode = httpStatus.OK;
      res.locals.data = user;

      next();
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const user = await UserService.delete(id);

      res.locals.statusCode = httpStatus.OK;
      res.locals.data = user;

      next();
    } catch (err) {
      next(err);
    }
  }
}
