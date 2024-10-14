import { Request, Response } from "express";
import { NotFoundError, BadRequestError, UnauthorizedError } from "../errors/index";
import Ride from "../models/Ride";
import User from "../models/User";

const createRide = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const { from, to, date, availableSeats, price } = req.body;

  console.log(req.body)

  if (!from || !to || !date || !availableSeats || !price) {
    throw new BadRequestError("Please provide all required fields");
  }

  const newRide = await Ride.create({
    creator: userId,
    from,
    to,
    date,
    availableSeats,
    price
  });

  res.status(201).json({ ride: newRide, success: true });
};

const getAllRides = async (req: Request, res: Response) => {
  const rides = await Ride.find().populate('creator', 'name email');
  res.status(200).json({ rides, success: true });
};

const getRide = async (req: Request, res: Response) => {
  const { id } = req.params;
  const ride = await Ride.findById(id).populate('creator', 'name email');
  
  if (!ride) {
    throw new NotFoundError("Ride not found");
  }

  res.status(200).json({ ride, success: true });
};

const updateRide = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const { id } = req.params;
  const { from, to, date, availableSeats, price } = req.body;

  const ride = await Ride.findById(id);
  
  if (!ride) {
    throw new NotFoundError("Ride not found");
  }

  if (ride.creator.toString() !== userId) {
    throw new UnauthorizedError("Not authorized to update this ride");
  }

  if (from) ride.from = from;
  if (to) ride.to = to;
  if (date) ride.date = date;
  if (availableSeats) ride.availableSeats = availableSeats;
  if (price) ride.price = price;

  await ride.save();

  res.status(200).json({ ride, msg: "Ride updated successfully", success: true });
};

const deleteRide = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const { id } = req.params;

  const ride = await Ride.findById(id);
  
  if (!ride) {
    throw new NotFoundError("Ride not found");
  }

  if (ride.creator.toString() !== userId) {
    throw new UnauthorizedError("Not authorized to delete this ride");
  }

  await Ride.findByIdAndDelete(id);

  res.status(200).json({ msg: "Ride deleted successfully", success: true });
};

export { createRide, getAllRides, getRide, updateRide, deleteRide };