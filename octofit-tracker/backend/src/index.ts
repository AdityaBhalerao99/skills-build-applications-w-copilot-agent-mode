import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import activityRouter from './routes/activity'

dotenv.config()

const app = express()
const port = Number(process.env.PORT ?? 8000)
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_tracker'

app.use(express.json())
app.use('/api/activities', activityRouter)

async function start() {
  try {
    await mongoose.connect(mongoUri)
    console.log('Connected to MongoDB')
    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`)
    })
  } catch (error) {
    console.error('Failed to start server', error)
    process.exit(1)
  }
}

start()
