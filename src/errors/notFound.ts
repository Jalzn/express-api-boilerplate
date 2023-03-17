import httpStatus from "http-status";
import { errors } from "@/constants/errors";
import { BaseError } from "./baseError";

export class NotFound extends BaseError {
  constructor(message: string) {
    super(errors.NOT_FOUND, httpStatus.NOT_FOUND, message);
  }
}
