import { UserIn } from "@/interfaces/user.interface";
import { AuthService } from "@/services/auth.service";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const credentials: UserIn = req.body

      const token = await AuthService.login(credentials)

      res.locals.statusCode = httpStatus.OK
      res.locals.data = token

      next()
    } catch(err) {
      next(err)
    }
  }
} 