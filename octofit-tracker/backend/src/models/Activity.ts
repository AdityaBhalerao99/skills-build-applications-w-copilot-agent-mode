import { Schema, model } from 'mongoose'

interface Activity {
  userId: string
  type: string
  durationMinutes: number
  caloriesBurned: number
  date: Date
}

const activitySchema = new Schema<Activity>(
  {
    userId: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, default: () => new Date() },
  },
  { timestamps: true },
)

export default model<Activity>('Activity', activitySchema)
