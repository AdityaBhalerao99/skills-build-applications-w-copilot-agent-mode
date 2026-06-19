import dotenv from 'dotenv'
import { connectDatabase } from '../config/database.ts'
import Activity from '../models/Activity.ts'
import Team from '../models/Team.ts'
import User from '../models/User.ts'
import Workout from '../models/Workout.ts'

dotenv.config()

/**
 * Seed the octofit_db database with test data.
 * This script populates users, teams, activities, and workouts.
 */
async function seed() {
  await connectDatabase()

  await Promise.all([
    Activity.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({}),
    Workout.deleteMany({}),
  ])

  const users = await User.create([
    {
      name: 'Ava Parker',
      email: 'ava.parker@example.com',
      passwordHash: 'password123hash',
      role: 'member',
    },
    {
      name: 'Noah Chen',
      email: 'noah.chen@example.com',
      passwordHash: 'password123hash',
      role: 'coach',
    },
    {
      name: 'Sophia Reyes',
      email: 'sophia.reyes@example.com',
      passwordHash: 'password123hash',
      role: 'member',
    },
    {
      name: 'Mia Johnson',
      email: 'mia.johnson@example.com',
      passwordHash: 'password123hash',
      role: 'member',
    },
  ])

  const teams = await Team.create([
    {
      name: 'Team Momentum',
      description: 'Compete daily and keep the momentum going.',
      memberIds: [users[0]._id.toString(), users[1]._id.toString()],
    },
    {
      name: 'Wellness Warriors',
      description: 'Focus on steady habits and balanced wellness.',
      memberIds: [users[2]._id.toString(), users[3]._id.toString()],
    },
  ])

  await Promise.all([
    User.findByIdAndUpdate(users[0]._id, { teamId: teams[0]._id.toString() }),
    User.findByIdAndUpdate(users[1]._id, { teamId: teams[0]._id.toString() }),
    User.findByIdAndUpdate(users[2]._id, { teamId: teams[1]._id.toString() }),
    User.findByIdAndUpdate(users[3]._id, { teamId: teams[1]._id.toString() }),
  ])

  await Activity.create([
    {
      userId: users[0]._id.toString(),
      type: 'Running',
      durationMinutes: 42,
      caloriesBurned: 510,
      date: new Date('2026-06-10'),
    },
    {
      userId: users[0]._id.toString(),
      type: 'Yoga',
      durationMinutes: 50,
      caloriesBurned: 210,
      date: new Date('2026-06-12'),
    },
    {
      userId: users[1]._id.toString(),
      type: 'Strength Training',
      durationMinutes: 45,
      caloriesBurned: 420,
      date: new Date('2026-06-11'),
    },
    {
      userId: users[2]._id.toString(),
      type: 'Cycling',
      durationMinutes: 70,
      caloriesBurned: 610,
      date: new Date('2026-06-14'),
    },
    {
      userId: users[3]._id.toString(),
      type: 'Pilates',
      durationMinutes: 35,
      caloriesBurned: 260,
      date: new Date('2026-06-13'),
    },
  ])

  await Workout.create([
    {
      userId: users[0]._id.toString(),
      title: 'Morning HIIT',
      description: 'High-intensity interval training to kickstart the day.',
      durationMinutes: 30,
      intensity: 'high',
      scheduledFor: new Date('2026-06-20'),
    },
    {
      userId: users[1]._id.toString(),
      title: 'Core Recovery',
      description: 'A gentle stretch and mobility routine.',
      durationMinutes: 25,
      intensity: 'low',
      scheduledFor: new Date('2026-06-21'),
    },
    {
      userId: users[2]._id.toString(),
      title: 'Endurance Ride',
      description: 'Steady cycling session focused on cardiovascular endurance.',
      durationMinutes: 60,
      intensity: 'medium',
      scheduledFor: new Date('2026-06-22'),
    },
  ])

  console.log('Seed the octofit_db database with test data')
  console.log('Database seed complete')
  process.exit(0)
}

seed().catch((error) => {
  console.error('Seed failed', error)
  process.exit(1)
})
