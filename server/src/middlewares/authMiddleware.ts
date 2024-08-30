import JWT from 'jsonwebtoken'
import { UnauthenticatedError } from '../errors/index'
import { NextFunction, Request, Response } from 'express'

interface JwtPayload {
  userId: string
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
    }
  }
}

const authenticateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authentication Invalid')
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = JWT.verify(token, process.env.JWT_SECRET as string) as JwtPayload
    req.user = payload
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication Invalid')
  }
}

export { authenticateUser }