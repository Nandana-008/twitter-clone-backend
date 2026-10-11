import { Router } from "express";
import { create, getById, getAll } from "../controllers/tweet.controller";
import { verifyToken } from "../middlewears/auth.middlewear";
import { validate } from "../middlewears/validate.middlewear";
import { createTweetSchema, getTweetsSchema } from "../schemas/tweet.schema";

const tweetRouter = Router();

tweetRouter.post("/", verifyToken, validate(createTweetSchema), create);
tweetRouter.get("/", validate(getTweetsSchema), getAll);
tweetRouter.get("/:id", getById);

export default tweetRouter;
