import { Router } from "express";
import { create } from "../controllers/tweet.controller";
import { verifyToken } from "../middlewears/auth.middlewear";
import { validate } from "../middlewears/validate.middlewear";
import { createTweetSchema } from "../schemas/tweet.schema";

const tweetRouter = Router();

tweetRouter.post("/", verifyToken, validate(createTweetSchema), create);

export default tweetRouter;
