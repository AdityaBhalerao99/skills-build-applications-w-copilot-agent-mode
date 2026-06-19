import { Schema, model, Types } from 'mongoose'

interface Activity {
  userId: Types.ObjectId
  type: string
  durationMinutes: number
  caloriesBurned: number
  date: Date
}

const activitySchema = new Schema<Activity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, default: () => new Date() },
  },
  { timestamps: true },
)

export default model<Activity>('Activity', activitySchema)
