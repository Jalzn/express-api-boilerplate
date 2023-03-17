import { errors } from "@/constants";
import { BaseError } from "@/errors/baseError";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

type HandledError = BaseError | Error;

export const errorHandler = (
  err: HandledError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof BaseError) {
    return res
      .status(err.statusCode)
      .send({
        type: err.type,
        statusCode: err.statusCode,
        message: err.message,
      });
  }

  return res
    .status(httpStatus.INTERNAL_SERVER_ERROR)
    .send({
      type: errors.INTERNAL,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
    })
};
