import CustomAPIError from "./custom-api"
import { StatusCodes } from "http-status-codes"

export default class BadRequestError extends CustomAPIError {
  statusCode: number

  constructor(msg: string) {
    super(msg)
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}