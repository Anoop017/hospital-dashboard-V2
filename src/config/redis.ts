import { createClient } from 'redis'
import dotenv from 'dotenv'

dotenv.config()

const redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
    },
    password: process.env.REDIS_PASSWORD
})

redisClient.on("connect", () => {
    console.log("Redis Connected")
})

redisClient.on("error", (error) => {
    console.error("Redis Error", error)
})


await redisClient.connect()

export default redisClient