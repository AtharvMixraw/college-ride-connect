import mongoose, { Document, Schema } from 'mongoose';

interface IRequest {
  user: mongoose.Types.ObjectId;
  status: 'pending' | 'accepted' | 'rejected';
}

interface IRide extends Document {
  creator: mongoose.Types.ObjectId;
  from: string;
  to: string;
  date: Date;
  availableSeats: number;
  price: number;
  passengers: mongoose.Types.ObjectId[];
  requests: IRequest[];
}

const RideSchema: Schema<IRide> = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  availableSeats: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  passengers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  requests: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    }
  }]
}, {
    timestamps: true
});

export default mongoose.model<IRide>("Ride", RideSchema)
