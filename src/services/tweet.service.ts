import prisma from "../lib/prisma";
import { ApiError } from "../utils/ApiError";

interface CreateTweetInput {
  authorId: string;
  content: string;
}

export const createTweet = async (input: CreateTweetInput) => {
  const { authorId, content } = input;

  const tweet = await prisma.tweet.create({
    data: {
      authorId,
      content,
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          displayName: true,
          avatarUrl: true,
        },
      },
    },
  });

  return tweet;
};

export const getTweetById = async (
  tweetId: string,
  viewerId: string | undefined,
) => {
  const tweet = await prisma.tweet.findUnique({
    where: {
      id: tweetId,
      deletedAt: null,
    },
    include: {
      _count: {
        select: {
          likes: true,
        },
      },
      likes: {
        where: viewerId ? { userId: viewerId } : { userId: { in: [] } },
        select: {
          userId: true,
        },
      },
      author: {
        select: {
          id: true,
          username: true,
          displayName: true,
          avatarUrl: true,
        },
      },
    },
  });

  if (!tweet) {
    throw new ApiError(404, "Tweet not found");
  }

  const { _count, likes, ...rest } = tweet;

  return {
    ...rest,
    totalLikes: _count.likes,
    isLiked: likes.length > 0,
  };
};

export const getAllTweets = async (
  page: number,
  limit: number,
  viewerId: string | undefined,
) => {
  const skip = (page - 1) * limit;

  const tweets = await prisma.tweet.findMany({
    skip,
    take: limit,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    where: {
      deletedAt: null,
    },
    include: {
      _count: {
        select: {
          likes: true,
        },
      },
      likes: {
        where: viewerId ? { userId: viewerId } : { userId: { in: [] } },
        select: {
          userId: true,
        },
      },
      author: {
        select: {
          id: true,
          username: true,
          displayName: true,
          avatarUrl: true,
        },
      },
    },
  });

  return tweets.map((tweet) => {
    const { _count, likes, ...rest } = tweet;

    return {
      ...rest,
      totalLikes: _count.likes,
      isLiked: likes.length > 0,
    };
  });
};

export const deleteTweet = async (tweetId: string, userId: string) => {
  const tweet = await prisma.tweet.findUnique({
    where: {
      id: tweetId,
      deletedAt: null,
    },
  });

  if (!tweet) {
    throw new ApiError(404, "Tweet not found");
  }

  if (tweet.authorId !== userId) {
    throw new ApiError(403, "You cannot delete this tweet");
  }

  await prisma.tweet.update({
    where: {
      id: tweetId,
      deletedAt: null,
    },
    data: {
      deletedAt: new Date(),
    },
  });
};

export const updateTweet = async (
  tweetId: string,
  userId: string,
  content: string,
) => {
  const tweet = await prisma.tweet.findUnique({
    where: {
      id: tweetId,
      deletedAt: null,
    },
  });

  if (!tweet) {
    throw new ApiError(404, "Tweet not found.");
  }

  if (tweet.authorId !== userId) {
    throw new ApiError(403, "You cannot edit this tweet");
  }

  const updatedTweet = await prisma.tweet.update({
    where: {
      id: tweetId,
      deletedAt: null,
    },
    data: {
      content,
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          displayName: true,
          avatarUrl: true,
        },
      },
    },
  });

  return updatedTweet;
};
