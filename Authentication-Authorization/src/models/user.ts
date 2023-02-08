import { Schema, model, Model } from 'mongoose'

import { User, UserDoc } from '../interfaces/modelInterfaces/user.interface'

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    nickName: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String },
    totalUpvoteCount: { type: Number, default: 0 },
    totalRepostCount: { type: Number, default: 0 },
    email: { type: String },
    role: { type: [String], required: true },
    isEmailVerified: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)

const UserModel = model<UserDoc>('users',userSchema) as Model<UserDoc>

export default UserModel