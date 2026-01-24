import { Schema, model, Document } from "mongoose";

export interface UserDocument extends Document {
    email: string;
    role: "ADMIN" | "DOCTOR" | "PATIENT";
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            enum: ["ADMIN", "DOCTOR", "PATIENT"],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const UserModel = model<UserDocument>("User", userSchema);