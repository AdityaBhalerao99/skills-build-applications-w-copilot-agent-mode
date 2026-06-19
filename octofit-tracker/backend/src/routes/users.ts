import { Router } from 'express'
import User from '../models/User.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ name: 1 })
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch users' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch user' })
  }
})

router.post('/', async (req, res) => {
  try {
    const user = new User(req.body)
    const saved = await user.save()
    res.status(201).json(saved)
  } catch (error) {
    res.status(400).json({ error: 'Could not create user' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!updated) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json(updated)
  } catch (error) {
    res.status(400).json({ error: 'Could not update user' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: 'Could not delete user' })
  }
})

export default router
