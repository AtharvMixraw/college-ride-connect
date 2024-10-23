import JWT from "jsonwebtoken"
import { Request, Response } from "express"
import { BadRequestError, UnauthenticatedError } from "../errors/index"
import User from "../models/User"

const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body

  let user = await User.findOne({ email })
  if (user) {
    throw new BadRequestError("Email already registered")
  }

  user = await User.create({ name, email, password })
  res.status(201).json({ user, msg: "User registered successfully", success: true })
}

const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password")
  }

  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials")
  }

  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials")
  }

  const token = JWT.sign(
    { 
      userId: user._id,
      email: user.email,
      name: user.name
    },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRE }
  )

  res.status(200).json({ user, token, success: true })
}

export { register, login }