import * as z from "zod";
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../errors/ValidationError.js";

export const validateBody =
    <T extends z.ZodTypeAny>(schema: T) =>
        (req: Request, _res: Response, next: NextFunction) => {
            const result = schema.safeParse(req.body);

            if (!result.success) {
                const flattened = z.flattenError(result.error);
                throw new ValidationError("Invalid request body", flattened);
            }

            req.body = result.data;
            next();
        };