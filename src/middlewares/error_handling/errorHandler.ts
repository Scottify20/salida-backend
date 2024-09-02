import { NextFunction, Request, Response } from 'express';

import ErrorResponse from '../../interfaces/types/ErrorResponse';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  res.setHeader('Content-Type', 'application/json');
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  // res.json({
  //   message: err.message,
  // });

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🤐' : err.stack,
  });
}

export default errorHandler;
