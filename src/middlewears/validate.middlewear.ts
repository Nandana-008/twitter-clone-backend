import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";
import { ApiError } from "../utils/ApiError";

export const validate = (schema: ZodType) => (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const result = schema.safeParse({
        body: req.body,
        query: req.query,
        params: req.params,
    });

    if (!result.success) {
        const message = result.error.issues
        .map((issue) => issue.message)
        .join(", ");

        throw new ApiError(400, message);
    }

    next();
};