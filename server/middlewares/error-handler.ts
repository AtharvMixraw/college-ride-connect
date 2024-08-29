import { StatusCodes } from "http-status-codes"
import { Request, Response, NextFunction } from "express"

interface CustomError extends Error {
  statusCode?: number,
  code?: number,
  errors?: { [key: string]: { message: string } },
  keyValue?: { [key: string]: any },
  value?: any,
}

const errorHandlerMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, please try again later',
  }

  if (err.name === 'ValidationError' && err.errors) {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ')
    customError.statusCode = StatusCodes.BAD_REQUEST
  }

  if (err.code && err.code === 11000 && err.keyValue) {
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue).join(', ')} field(s), please choose another value`
    customError.statusCode = StatusCodes.BAD_REQUEST
  }

  if (err.name === 'CastError') {
    customError.msg = `No item found with id: ${err.value}`
    customError.statusCode = StatusCodes.NOT_FOUND
  }

  return res.status(customError.statusCode).json({ msg: customError.msg })
}

export default errorHandlerMiddleware