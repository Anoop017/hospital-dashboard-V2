import { createClient } from 'redis'
import { config } from './zod.js'

const redisClient = createClient({
    socket: {
        host: config.REDIS_HOST,
        port: Number(config.REDIS_PORT)
    },
    password: config.REDIS_PASSWORD
})

redisClient.on("connect", () => {
    console.log("Redis Connected")
})

redisClient.on("error", (error) => {
    console.error("Redis Error", error)
})


await redisClient.connect()

export default redisClient