import { Schema, model, Types } from 'mongoose'

export interface LeaderboardEntry {
  userId: Types.ObjectId
  userName: string
  teamName?: string
  activityCount: number
  totalDuration: number
  totalCalories: number
  rank: number
}

const leaderboardSchema = new Schema<LeaderboardEntry>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    teamName: { type: String, required: false },
    activityCount: { type: Number, required: true, default: 0 },
    totalDuration: { type: Number, required: true, default: 0 },
    totalCalories: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
)

export default model<LeaderboardEntry>('Leaderboard', leaderboardSchema)
