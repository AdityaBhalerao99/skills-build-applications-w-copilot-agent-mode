import { Router } from 'express'
import Workout from '../models/Workout.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ scheduledFor: 1 })
    res.json(workouts)
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch workouts' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id)
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' })
    }
    res.json(workout)
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch workout' })
  }
})

router.post('/', async (req, res) => {
  try {
    const workout = new Workout(req.body)
    const saved = await workout.save()
    res.status(201).json(saved)
  } catch (error) {
    res.status(400).json({ error: 'Could not create workout' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updated = await Workout.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!updated) {
      return res.status(404).json({ error: 'Workout not found' })
    }
    res.json(updated)
  } catch (error) {
    res.status(400).json({ error: 'Could not update workout' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Workout.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ error: 'Workout not found' })
    }
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: 'Could not delete workout' })
  }
})

export default router
