import { z } from "zod";

export const echoSchema = z.object({
    message: z.string().min(1, "Message is required"),
    count: z.number().int().positive().optional(),
});