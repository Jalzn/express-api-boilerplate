import argon from "argon2";
import jwt from "jsonwebtoken"
import { BadRequest, NotFound, Unauthorized  } from "@/errors";
import { UserIn } from "@/interfaces/user.interface";
import { UserService } from "./user.service";

export class AuthService {
  static async login(credentials: UserIn) {
    if(credentials.email === undefined) {
      throw new BadRequest("Email is missing")
    }

    if(credentials.password === undefined) {
      throw new BadRequest("Password is missing")
    }

    const user = await UserService.get({
      email: credentials.email,
    });

    if (!user) {
      throw new NotFound("Email not found");
    }

    const matchPassword = await argon.verify(
      user.password,
      credentials.password
    );

    if(!matchPassword) {
      throw new Unauthorized("Wrong password")
    }

    const token = jwt.sign({
      email: user.email
    }, "SECRET")

    return token
  }

  static async register() {}

  static async check() {}
}
