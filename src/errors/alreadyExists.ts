import httpStatus from "http-status";
import { errors } from "@/constants/errors";
import { BaseError } from "./baseError";

export class AlreadyExists extends BaseError {
  constructor(message: string) {
    super(errors.ALREADY_EXISTS, httpStatus.UNPROCESSABLE_ENTITY, message);
  }
}
