import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
    PORT: z.string().default("3000"),

    MONGO_URI: z.string().min(1, "MONGO_URI is required"),

    JWT_SECRET: z.string().min(10, "JWT_SECRET must be atleast 10 characters"),

    REDIS_HOST: z.string().min(1, "REDIS_HOST is required"),

    REDIS_PORT: z.string().default("17119"),

    REDIS_PASSWORD: z.string().min(10, "REDIS_PASSWORD must be atleast 10 caharacters")

})

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error("Invalid Environment variables:");
    console.error(z.treeifyError(parsedEnv.error))
    process.exit(1);

}
export const config = parsedEnv.data