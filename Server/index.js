require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

// routes
const authRouter = require('./routes/authRoute')
const userRouter = require('./routes/userRoute')
const walletRouter = require('./routes/walletRoute')
const tasksRouter = require('./routes/taksRoute')

// db
require('./sql/connection')

const port = 3000

const app = express()

app.use(bodyParser())
app.use(cookieParser(process.env.JWT_SECRET))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// routes
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/wallet', walletRouter)
app.use('/api/tasks', tasksRouter)

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})