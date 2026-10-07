import type { Request, Response } from "express";
import { createTweet, getTweetById } from "../services/tweet.service";
import { ApiError } from "../utils/ApiError";

export const create = async (req: Request, res: Response) => {
  const authorId = res.locals.user.id;
  const { content } = req.body;

  const tweet = await createTweet({
    authorId,
    content,
  });

  return res.status(201).json({
    success: true,
    message: "Tweet created successfully",
    data: tweet,
  });
};

export const getById = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  const tweet = await getTweetById(id);

  if (!tweet) {
    throw new ApiError(404, "Tweet not found");
  }

  return res.status(200).json({
    success: true,
    data: tweet,
  });
};
