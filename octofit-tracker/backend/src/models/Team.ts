import { Schema, model } from 'mongoose'

export interface Team {
  name: string
  description: string
  memberIds: string[]
}

const teamSchema = new Schema<Team>(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    memberIds: { type: [String], default: [] },
  },
  { timestamps: true },
)

export default model<Team>('Team', teamSchema)
