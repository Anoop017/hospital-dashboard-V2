import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service.js";

const userService = new UserService();

export const getUserByIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id as string;

        const user = await userService.getUserById(id);

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        next(error);
    }
};