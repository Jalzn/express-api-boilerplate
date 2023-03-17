import { errors } from "@/constants/errors";
import { Request, Response } from "express";
import httpStatus from "http-status";

export const pageNotFoundHandler = (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).send({
    type: errors.NOT_FOUND,
    statusCode: httpStatus.NOT_FOUND,
    message: "Endpoint not found",
  });
};
