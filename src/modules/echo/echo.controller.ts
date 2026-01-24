import { Request, Response } from "express";

export const echoController = (req: Request, res: Response) => {
    res.json({
        success: true,
        data: req.body,
    });
};