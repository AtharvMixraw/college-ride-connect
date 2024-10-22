import { Request, Response } from "express";
import { NotFoundError, BadRequestError, UnauthorizedError } from "../errors/index";
import Ride from "../models/Ride";
import mongoose from "mongoose";
import WebSocketService from "../services/WebSocketService";

let wsService: WebSocketService;

export const initializeWebSocket = (service: WebSocketService) => {
  wsService = service;
};

// Create a new ride
const createRide = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const { from, to, date, availableSeats, price } = req.body;

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

  // Notify potential passengers about new ride
  await wsService.notifyRideUpdate('all', 'newRide', {
    ride: newRide
  });

  res.status(201).json({ ride: newRide, success: true });
};

// Get all rides with filters
const getAllRides = async (req: Request, res: Response) => {
  const { from, to, date, minSeats } = req.query;
  
  let queryObject: any = {};
  
  if (from) queryObject.from = new RegExp(from as string, 'i');
  if (to) queryObject.to = new RegExp(to as string, 'i');
  if (date) queryObject.date = new Date(date as string);
  if (minSeats) queryObject.availableSeats = { $gte: Number(minSeats) };

  const rides = await Ride.find(queryObject)
    .populate('creator', 'name email')
    .populate('passengers', 'name email')
    .sort({ date: 1 });

  res.status(200).json({ rides, count: rides.length, success: true });
};

// Get single ride details
const getRide = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const ride = await Ride.findById(id)
    .populate('creator', 'name email')
    .populate('passengers', 'name email')
    .populate('requests.user', 'name email');
  
  if (!ride) {
    throw new NotFoundError("Ride not found");
  }

  res.status(200).json({ ride, success: true });
};

// Update ride details
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

  // Don't allow reducing seats below current passenger count
  if (availableSeats && availableSeats < ride.passengers.length) {
    throw new BadRequestError("Cannot reduce seats below current passenger count");
  }

  const updatedFields: any = {};
  if (from) updatedFields.from = from;
  if (to) updatedFields.to = to;
  if (date) updatedFields.date = date;
  if (availableSeats) updatedFields.availableSeats = availableSeats;
  if (price) updatedFields.price = price;

  const updatedRide = await Ride.findByIdAndUpdate(
    id,
    updatedFields,
    { new: true, runValidators: true }
  ).populate('creator', 'name email')
    .populate('passengers', 'name email');

  // Notify all passengers about the update
  await wsService.notifyRideUpdate(id, 'rideUpdated', {
    ride: updatedRide
  });

  res.status(200).json({ ride: updatedRide, success: true });
};

// Delete a ride
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

  // Notify all passengers about cancellation
  await wsService.notifyRideUpdate(id, 'rideCancelled', {
    rideId: id
  });

  await Ride.findByIdAndDelete(id);

  res.status(200).json({ msg: "Ride deleted successfully", success: true });
};

// Send request to join a ride
const sendJoinRequest = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const { rideId } = req.params;

  const ride = await Ride.findById(rideId);
  if (!ride) {
    throw new NotFoundError("Ride not found");
  }

  if (ride.availableSeats <= 0) {
    throw new BadRequestError("No seats available on this ride");
  }

  if (ride.creator.toString() === userId) {
    throw new BadRequestError("Cannot join your own ride");
  }

  const existingRequest = ride.requests.find(
    request => request.user.toString() === userId
  );
  if (existingRequest) {
    throw new BadRequestError("You have already sent a request for this ride");
  }

  const isPassenger = ride.passengers.includes(new mongoose.Types.ObjectId(userId));
  if (isPassenger) {
    throw new BadRequestError("You are already a passenger on this ride");
  }

  ride.requests.push({
    user: new mongoose.Types.ObjectId(userId),
    status: 'pending'
  });
  
  await ride.save();

  // Notify ride creator about new request
  await wsService.notifyUser(ride.creator.toString(), 'newJoinRequest', {
    rideId,
    requesterId: userId
  });

  res.status(200).json({ message: "Join request sent successfully", success: true });
};

// Handle join request (accept/reject)
const handleJoinRequest = async (req: Request, res: Response) => {
  const creatorId = req.user?.userId;
  const { rideId, requestId } = req.params;
  const { status } = req.body;

  if (status !== 'accepted' && status !== 'rejected') {
    throw new BadRequestError("Invalid status. Must be 'accepted' or 'rejected'");
  }

  const ride = await Ride.findById(rideId);
  if (!ride) {
    throw new NotFoundError("Ride not found");
  }

  if (ride.creator.toString() !== creatorId) {
    throw new UnauthorizedError("Not authorized to handle requests for this ride");
  }

  const request = ride.requests.find(
    request => request.user.toString() === requestId
  );
  if (!request) {
    throw new NotFoundError("Request not found");
  }

  if (request.status !== 'pending') {
    throw new BadRequestError("This request has already been handled");
  }

  request.status = status;

  if (status === 'accepted') {
    if (ride.availableSeats <= 0) {
      throw new BadRequestError("No seats available on this ride");
    }
    ride.passengers.push(request.user);
    ride.availableSeats -= 1;
  }

  await ride.save();

  // Notify the requester about the decision
  await wsService.notifyUser(requestId, 'requestUpdate', {
    status,
    rideId
  });

  // Notify all passengers about seat update
  await wsService.notifyRideUpdate(rideId, 'passengerUpdate', {
    passengers: ride.passengers,
    availableSeats: ride.availableSeats
  });

  res.status(200).json({ message: `Join request ${status}`, success: true });
};

// Leave a ride
const leaveRide = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const { rideId } = req.params;

  const ride = await Ride.findById(rideId);
  if (!ride) {
    throw new NotFoundError("Ride not found");
  }

  const passengerIndex = ride.passengers.findIndex(
    passengerId => passengerId.toString() === userId
  );
  
  if (passengerIndex === -1) {
    throw new BadRequestError("You are not a passenger on this ride");
  }

  // Remove passenger from the passengers array
  ride.passengers.splice(passengerIndex, 1);
  
  // Increment available seats
  ride.availableSeats += 1;

  // Remove any pending/accepted requests from this user
  ride.requests = ride.requests.filter(
    request => request.user.toString() !== userId
  );

  await ride.save();

  // Notify ride creator
  await wsService.notifyUser(ride.creator.toString(), 'passengerLeft', {
    rideId,
    passengerId: userId
  });

  // Notify other passengers about seat update
  await wsService.notifyRideUpdate(rideId, 'passengerUpdate', {
    passengers: ride.passengers,
    availableSeats: ride.availableSeats
  });

  res.status(200).json({
    message: "Successfully left the ride",
    success: true
  });
};

export {
  createRide,
  getAllRides,
  getRide,
  updateRide,
  deleteRide,
  sendJoinRequest,
  handleJoinRequest,
  leaveRide
};