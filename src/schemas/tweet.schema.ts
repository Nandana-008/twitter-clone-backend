import z from "zod";

export const createTweetSchema = z.object({
  body: z.object({
    content: z
      .string()
      .min(1, "Tweet cannot be empty")
      .max(280, "Tweet cannot exceed 280 characters"),
  }),
});

export const getTweetsSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().max(50).default(10),
  }),
});
