import { Schema, model, Types } from 'mongoose'

export interface Workout {
  userId: Types.ObjectId
  title: string
  description: string
  durationMinutes: number
  intensity: 'low' | 'medium' | 'high'
  scheduledFor: Date
}

const workoutSchema = new Schema<Workout>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    intensity: { type: String, required: true, enum: ['low', 'medium', 'high'] },
    scheduledFor: { type: Date, required: true },
  },
  { timestamps: true },
)

export default model<Workout>('Workout', workoutSchema)
