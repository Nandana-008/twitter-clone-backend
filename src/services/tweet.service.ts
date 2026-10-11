import prisma from "../lib/prisma";

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

export const getTweetById = async (tweetId: string) => {
  const tweet = await prisma.tweet.findUnique({
    where: {
      id: tweetId,
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

export const getAllTweets = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const tweets = await prisma.tweet.findMany({
    skip,
    take: limit,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
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

  return tweets;
};
