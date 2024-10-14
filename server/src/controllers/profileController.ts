import { Request, Response } from "express"
import { NotFoundError, BadRequestError } from "../errors/index"
import User from "../models/User"

const getProfile = async (req: Request, res: Response) => {
  const userId = req.user?.userId

  const user = await User.findById(userId)
  if (!user) {
    throw new NotFoundError("User not found")
  }

  res.status(200).json({ user, success: true })
}

const updateProfile = async (req: Request, res: Response) => {
  const userId = req.user?.userId
  const { name, email } = req.body

  if (!name && !email) {
    throw new BadRequestError("Please provide at least one field to update")
  }

  const user = await User.findById(userId)
  if (!user) {
    throw new NotFoundError("User not found")
  }

  if (name) user.name = name
  if (email) user.email = email

  await user.save()

  res.status(200).json({ user, msg: "Profile updated successfully", success: true })
}

const deleteProfile = async (req: Request, res: Response) => {
  const userId = req.user?.userId

  const user = await User.findByIdAndDelete(userId)
  if (!user) {
    throw new NotFoundError("User not found")
  }

  res.status(200).json({ msg: "Profile deleted successfully", success: true })
}

export { getProfile, updateProfile, deleteProfile }