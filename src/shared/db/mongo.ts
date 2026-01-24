import mongoose from "mongoose";
import { config } from "../../config/zod.js";

const MAX_RETRIES = 5;
const RETRY_DELAY = 3000;

export const connectMongo = async (retries = MAX_RETRIES): Promise<void> => {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("✅ MongoDB connected");
    } catch (error) {
        console.error("❌ MongoDB connection failed");

        if (retries === 0) {
            console.error("❌ No retries left. Exiting...");
            process.exit(1);
        }

        console.log(`🔁 Retrying MongoDB connection (${retries} left)...`);
        setTimeout(() => connectMongo(retries - 1), RETRY_DELAY);
    }
};

export const disconnectMongo = async () => {
    await mongoose.connection.close();
    console.log("🛑 MongoDB disconnected");
};