import httpStatus from "http-status";
import { errors } from "../constants"
import { BaseError } from "./baseError";

export class Unauthorized extends BaseError {
  constructor(message: string) {
    super(errors.UNAUTHORIZED, httpStatus.UNAUTHORIZED, message);
  }
}