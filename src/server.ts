import express from 'express'
import dotenv from 'dotenv'
import redisClient from './config/redis.js'

dotenv.config()
const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send("This is the Home Page")
})

app.get('/health', async (req, res) => {
    const cachedData = await redisClient.get("health")

    if (cachedData) {
        return res.send({
            source: "redis-cache",
            data: cachedData
        })
    }

    //This is a if not condition - YAY

    const response = "This is the Health Page!"

    await redisClient.setEx("health", 60, response)
    res.send({
        source: "server!",
        data: response
    })

})



app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`)
})