import express from 'express'
import dotenv from 'dotenv'
import { connectDatabase } from './config/database.ts'
import activityRouter from './routes/activity.ts'
import userRouter from './routes/users.ts'
import teamRouter from './routes/teams.ts'
import workoutRouter from './routes/workouts.ts'
import leaderboardRouter from './routes/leaderboard.ts'

dotenv.config()

const app = express()
const port = Number(process.env.PORT ?? 8000)

app.use(express.json())
app.use('/api/users', userRouter)
app.use('/api/teams', teamRouter)
app.use('/api/activities', activityRouter)
app.use('/api/workouts', workoutRouter)
app.use('/api/leaderboard', leaderboardRouter)

async function start() {
  try {
    await connectDatabase()
    const codespaceName = process.env.CODESPACE_NAME
    const baseUrl = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev`
      : `http://localhost:${port}`

    app.listen(port, '0.0.0.0', () => {
      console.log(`Server listening on ${baseUrl}`)
    })
  } catch (error) {
    console.error('Failed to start server', error)
    process.exit(1)
  }
}

start()
