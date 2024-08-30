import mongoose, { Document, Model } from "mongoose"
import bcrypt from "bcryptjs"

interface IUser extends Document {
  name: string,
  email: string,
  password: string,
  comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { 
    type: String, 
    required: [true, "Please provide a name"], 
    trim: true 
  },
  email: { 
    type: String, 
    required: [true, "Please provide an email"], 
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
  },
  password: { 
    type: String, 
    required: [true, "Please provide a password"],
    minlength: 6,
  }
}, { 
  timestamps: true 
});

UserSchema.pre('save', async function(this: IUser) {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 10)
})

UserSchema.methods.comparePassword = async function(this: IUser, candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.model<IUser>("User", UserSchema)
