import dotenv from 'dotenv'
import { connectDatabase } from './config/database'
import Activity from './models/Activity'
import Team from './models/Team'
import User from './models/User'
import Workout from './models/Workout'

dotenv.config()

async function seed() {
  await connectDatabase()

  await Promise.all([
    Activity.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({}),
    Workout.deleteMany({}),
  ])

  const users = await User.create([
    { name: 'Ava Parker', email: 'ava@example.com', passwordHash: 'testhash', role: 'member' },
    { name: 'Noah Chen', email: 'noah@example.com', passwordHash: 'testhash', role: 'coach' },
    { name: 'Sophia Reyes', email: 'sophia@example.com', passwordHash: 'testhash', role: 'member' },
  ])

  const teams = await Team.create([
    { name: 'Team Momentum', description: 'Daily fitness champions', memberIds: [users[0]._id.toString(), users[1]._id.toString()] },
    { name: 'Wellness Warriors', description: 'A squad focused on healthy habits', memberIds: [users[2]._id.toString()] },
  ])

  await User.findByIdAndUpdate(users[0]._id, { teamId: teams[0]._id.toString() })
  await User.findByIdAndUpdate(users[1]._id, { teamId: teams[0]._id.toString() })
  await User.findByIdAndUpdate(users[2]._id, { teamId: teams[1]._id.toString() })

  await Activity.create([
    { userId: users[0]._id.toString(), type: 'Running', durationMinutes: 38, caloriesBurned: 420, date: new Date('2026-06-15') },
    { userId: users[0]._id.toString(), type: 'Yoga', durationMinutes: 55, caloriesBurned: 220, date: new Date('2026-06-16') },
    { userId: users[1]._id.toString(), type: 'Strength', durationMinutes: 47, caloriesBurned: 380, date: new Date('2026-06-14') },
    { userId: users[2]._id.toString(), type: 'Cycling', durationMinutes: 70, caloriesBurned: 560, date: new Date('2026-06-17') },
  ])

  await Workout.create([
    { userId: users[0]._id.toString(), title: 'Core Blast', description: 'A compact high-intensity core workout', durationMinutes: 30, intensity: 'high', scheduledFor: new Date('2026-06-20') },
    { userId: users[1]._id.toString(), title: 'Recovery Stretch', description: 'Speed up recovery with guided stretching', durationMinutes: 25, intensity: 'low', scheduledFor: new Date('2026-06-21') },
  ])

  console.log('Database seed complete')
  process.exit(0)
}

seed().catch((error) => {
  console.error('Seed failed', error)
  process.exit(1)
})
