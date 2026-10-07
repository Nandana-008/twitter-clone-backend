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
