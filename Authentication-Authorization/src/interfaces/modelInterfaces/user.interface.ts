import { Date } from 'mongoose';
import { CorrectedDocument } from '../../models/types';

export interface User {
  name: string
  username: string
  nickName: string
  password: string
  image?: string
  totalUpvoteCount?: number
  totalRepostCount?: number
  email: string
  role: string[]
  isEmailVerified?: boolean
  isVerified?: boolean
}

export type UserDoc = User & CorrectedDocument