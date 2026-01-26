import express from 'express'
import { errorHandler } from "./shared/middleware/errorHandler.js";
import { notFound } from "./shared/middleware/notFound.js";
import { config } from './config/zod.js'
import redisClient from './config/redis.js'
import { AuthError } from "./shared/errors/AuthError.js";
import echoRoutes from './modules/echo/echo.routes.js'
import { connectDB, disconnectDB } from "./shared/db/index.js"
import userRoutes from "./modules/users/index.js";
import { UserRepository } from "./modules/users/user.repository.js";


//1. Middleware
const app = express()
app.use(express.json())

//2. Routes
app.use(echoRoutes)
app.use(userRoutes);

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



app.get("/test-error", () => {
    throw new AuthError("Invalid token");
});


app.get("/seed-user", async (req, res, next) => {
    try {
        const userRepo = new UserRepository()
        const user = await userRepo.create({
            email: "example@example.com",
            role: "ADMIN"
        })

        res.json(
            {
                success: true,
                data: user
            }
        )
    } catch (error) {
        next(error)
    }
})


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


//3. 404 handler (after routes)
app.use(notFound);


// 4. Global error handler (LAST middleware)
app.use(errorHandler);


//Start Server
startServer();