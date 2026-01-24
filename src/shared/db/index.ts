import { connectMongo, disconnectMongo } from "./mongo.js";

export const connectDB = async () => {
    await connectMongo();
};

export const disconnectDB = async () => {
    await disconnectMongo();
};