import httpStatus from "http-status";
import { errors } from "@/constants/errors";
import { BaseError } from "./baseError";

export class BadRequest extends BaseError {
  constructor(message: string) {
    super(errors.BAD_REQUEST, httpStatus.BAD_REQUEST, message);
  }
}