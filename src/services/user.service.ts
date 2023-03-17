import argon from 'argon2'
import { NotFound } from "@/errors";
import { AlreadyExists } from "@/errors/alreadyExists";
import { BadRequest } from "@/errors/badRequest";
import { UserIn } from "@/interfaces/user.interface";
import { UserRepository } from "@/repositories/user.repository";

export class UserService {
  static async all(args: object) {
    const users = await UserRepository.all(args)
    return users
  }

  static async getById(id: number) {
    const user = await UserRepository.getById(id)

    if(!user) {
      throw new NotFound("User not found")
    }

    return user
  }

  static async get(args: object) {
    const user = await UserRepository.get(args)

    if(!user) {
      throw new NotFound("User not found")
    }

    return user
  }

  static async create(data: UserIn) {
    if(data.email === undefined) {
      throw new BadRequest("Email is missing") 
    }

    if(data.password === undefined) {
      throw new BadRequest("Password is missing") 
    }

    data.password = await argon.hash(data.password)

    const hasUser = await UserRepository.all({email: data.email})

    if(hasUser.length !== 0) {
      throw new AlreadyExists("User already exists")
    }

    const user = await UserRepository.create(data)

    return user
  }

  static async update(id: number, data: object) {
    if(data == undefined) {
      throw new BadRequest("User update data is missing")
    }

    const hasUser = await UserRepository.getById(id)

    if(!hasUser) {
      throw new NotFound("User not found")
    }

    const user = await UserRepository.update(id, data)

    return user
  }

  static async delete(id: number) {
    const hasUser = await UserRepository.getById(id)

    if(!hasUser) {
      throw new NotFound("User not found")
    }

    const user = await UserRepository.delete(id)

    return user
  }
}
