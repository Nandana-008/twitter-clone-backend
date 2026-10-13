import { Request, Response } from "express";
import { createLike, deleteLike } from "../services/like.service";

export const createLikeController = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const tweetId = req.params.id;
  const userId = res.locals.user.id;

  const like = await createLike(tweetId, userId);

  return res.status(201).json({
    success: true,
    message: "Tweet liked successfully",
    data: like,
  });
};

export const deleteLikeController = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const tweetId = req.params.id;
  const userId = res.locals.user.id;

  await deleteLike(tweetId, userId);

  return res.status(200).json({
    success: true,
    message: "Tweet unliked successfully",
  });
};
