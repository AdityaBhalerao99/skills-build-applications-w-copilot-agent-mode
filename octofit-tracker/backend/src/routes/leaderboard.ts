import { Router } from 'express'
import Activity from '../models/Activity.ts'
import User from '../models/User.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const leaderboard = await Activity.aggregate([
      {
        $group: {
          _id: '$userId',
          totalCalories: { $sum: '$caloriesBurned' },
          totalDuration: { $sum: '$durationMinutes' },
          activityCount: { $sum: 1 },
        },
      },
      { $sort: { totalCalories: -1, totalDuration: -1 } },
      { $limit: 20 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          userId: '$_id',
          userName: '$user.name',
          email: '$user.email',
          activityCount: 1,
          totalCalories: 1,
          totalDuration: 1,
        },
      },
    ])
    res.json(leaderboard)
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch leaderboard' })
  }
})

export default router
