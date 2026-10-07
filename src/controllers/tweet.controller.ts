import type { Request, Response } from "express";
import { createTweet } from "../services/tweet.service";

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
