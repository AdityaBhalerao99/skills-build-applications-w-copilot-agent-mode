import { Router } from 'express'
import Team from '../models/Team.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const teams = await Team.find().sort({ name: 1 })
    res.json(teams)
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch teams' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
    if (!team) {
      return res.status(404).json({ error: 'Team not found' })
    }
    res.json(team)
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch team' })
  }
})

router.post('/', async (req, res) => {
  try {
    const team = new Team(req.body)
    const saved = await team.save()
    res.status(201).json(saved)
  } catch (error) {
    res.status(400).json({ error: 'Could not create team' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updated = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!updated) {
      return res.status(404).json({ error: 'Team not found' })
    }
    res.json(updated)
  } catch (error) {
    res.status(400).json({ error: 'Could not update team' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Team.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ error: 'Team not found' })
    }
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: 'Could not delete team' })
  }
})

export default router
