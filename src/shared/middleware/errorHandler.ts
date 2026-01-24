import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            error: {
                code: err.code,
                message: err.message,
                details: err.details || null,
            },
        });
    }

    // Unknown / programming errors
    console.error("Unhandled Error:", err);

    return res.status(500).json({
        success: false,
        error: {
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong",
        },
    });
};