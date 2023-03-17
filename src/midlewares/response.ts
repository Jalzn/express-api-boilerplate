import { Request, Response, NextFunction } from "express";

export const responseHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.locals.data) {
    return res.status(res.locals.statusCode).send({
      statusCode: res.locals.statusCode,
      data: res.locals.data,
    });
  }
  return next();
};
