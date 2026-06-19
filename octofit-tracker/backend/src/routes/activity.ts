import { Router } from 'express'
import Activity from '../models/Activity.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find().sort({ date: -1 })
    res.json(activities)
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch activities' })
  }
})

router.post('/', async (req, res) => {
  try {
    const activity = new Activity(req.body)
    const saved = await activity.save()
    res.status(201).json(saved)
  } catch (error) {
    res.status(400).json({ error: 'Could not create activity' })
  }
})

export default router
