import { Schema, model } from 'mongoose'

export interface User {
  name: string
  email: string
  passwordHash: string
  teamId?: string
  role: 'member' | 'coach' | 'admin'
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    teamId: { type: String, required: false },
    role: { type: String, required: true, default: 'member' },
  },
  { timestamps: true },
)

export default model<User>('User', userSchema)
