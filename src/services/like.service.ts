import prisma from "../lib/prisma";
import { ApiError } from "../utils/ApiError";

export const createLike = async (tweetId: string, userId: string) => {
  const tweet = await prisma.tweet.findUnique({
    where: {
      id: tweetId,
      deletedAt: null,
    },
  });

  if (!tweet) {
    throw new ApiError(404, "Tweet not found.");
  }

  const existingLike = await prisma.like.findUnique({
    where: {
      userId_tweetId: {
        userId,
        tweetId,
      },
    },
  });

  if (existingLike) {
    throw new ApiError(409, "You have already liked this tweet.");
  }

  const newLike = await prisma.like.create({
    data: {
      userId,
      tweetId,
    },
  });

  return newLike;
};

export const deleteLike = async (tweetId: string, userId: string) => {
  const tweet = await prisma.tweet.findUnique({
    where: {
      id: tweetId,
      deletedAt: null,
    },
  });

  if (!tweet) {
    throw new ApiError(404, "Tweet not found");
  }

  const deletedLike = await prisma.like.deleteMany({
    where: {
      userId,
      tweetId,
    },
  });

  if (deletedLike.count === 0) {
    throw new ApiError(404, "Like not found");
  }
};
