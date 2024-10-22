import express from 'express';
import { createRide, getAllRides, getRide, updateRide, deleteRide, sendJoinRequest, handleJoinRequest, leaveRide } from '../controllers/rideController';
import { authenticateUser } from '../middlewares/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Ride:
 *       type: object
 *       properties:
 *         creator:
 *           type: string
 *         from:
 *           type: string
 *         to:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 *         availableSeats:
 *           type: number
 *         price:
 *           type: number
 *     RideCreate:
 *       type: object
 *       required:
 *         - from
 *         - to
 *         - date
 *         - availableSeats
 *         - price
 *       properties:
 *         from:
 *           type: string
 *         to:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 *         availableSeats:
 *           type: number
 *         price:
 *           type: number
 *     RideUpdate:
 *       type: object
 *       properties:
 *         from:
 *           type: string
 *         to:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 *         availableSeats:
 *           type: number
 *         price:
 *           type: number
 */

/**
 * @swagger
 * /rides:
 *   post:
 *     summary: Create a new ride
 *     tags: [Rides]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RideCreate'
 *     responses:
 *       201:
 *         description: Ride created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *   get:
 *     summary: Get all rides
 *     tags: [Rides]
 *     responses:
 *       200:
 *         description: List of all rides
 *       500:
 *         description: Server error
 * 
 * /rides/{id}:
 *   get:
 *     summary: Get a specific ride
 *     tags: [Rides]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ride details
 *       404:
 *         description: Ride not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update a ride
 *     tags: [Rides]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RideUpdate'
 *     responses:
 *       200:
 *         description: Ride updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Ride not found
 *   delete:
 *     summary: Delete a ride
 *     tags: [Rides]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ride deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Ride not found
 *       500:
 *         description: Server error
 */

router.route('/')
  .post(authenticateUser, createRide)
  .get(getAllRides);

router.route('/:id')
  .get(getRide)
  .put(authenticateUser, updateRide)
  .delete(authenticateUser, deleteRide);

/**
 * @swagger
 * /rides/{rideId}/join-request:
 *   post:
 *     summary: Send a join request for a ride
 *     tags: [Rides]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rideId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Join request sent successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Ride not found
 * 
 * /rides/{rideId}/join-request/{requestId}:
 *   put:
 *     summary: Handle a join request for a ride
 *     tags: [Rides]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rideId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [accepted, rejected]
 *     responses:
 *       200:
 *         description: Join request handled successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Ride or request not found
 * 
 * /rides/{rideId}/leave:
 *   post:
 *     summary: Leave a ride as a passenger
 *     tags: [Rides]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rideId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully left the ride
 *       400:
 *         description: Bad request - Not a passenger on this ride
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Ride not found
 *       500:
 *         description: Server error
 */

router.post('/:rideId/join-request', authenticateUser, sendJoinRequest);
router.put('/:rideId/join-request/:requestId', authenticateUser, handleJoinRequest);
router.post('/:rideId/leave', authenticateUser, leaveRide);

export default router;