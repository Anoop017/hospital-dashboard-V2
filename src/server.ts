import express from 'express'
import { errorHandler } from "./shared/middleware/errorHandler.js";
import { notFound } from "./shared/middleware/notFound.js";
import { config } from './config/zod.js'
import redisClient from './config/redis.js'
import { AuthError } from "./shared/errors/AuthError.js";
import echoRoutes from './modules/echo/echo.routes.js'
import { connectDB, disconnectDB } from "./shared/db/index.js"

const app = express()
app.use(express.json())

//echo routes
app.use(echoRoutes)

const PORT = Number(config.PORT)

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

// 404 handler (after routes)
app.use(notFound);


// Global error handler (LAST middleware)
app.use(errorHandler);


app.get("/test-error", () => {
    throw new AuthError("Invalid token");
});



// Error handling
app.use(notFound);
app.use(errorHandler);


const startServer = async () => {
    await connectDB();


    const server = app.listen(config.PORT, () => {
        console.log(`🚀 Server running on port ${config.PORT}`);
    });


    const shutdown = async (signal: string) => {
        console.log(`🛑 Received ${signal}. Shutting down...`);
        server.close(async () => {
            await disconnectDB();
            process.exit(0);
        });
    };


    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
};


startServer();