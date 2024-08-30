import CustomAPIError from "./custom-api"
import { StatusCodes } from "http-status-codes"

export default class NotFoundError extends CustomAPIError {
  statusCode: number

  constructor(msg: string) {
    super(msg)
    this.statusCode = StatusCodes.NOT_FOUND
  }
}