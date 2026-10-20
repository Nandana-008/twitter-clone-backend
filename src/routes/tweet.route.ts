import { Router } from "express";
import {
  create,
  getById,
  getAll,
  remove,
  update,
} from "../controllers/tweet.controller";
import { verifyToken, optionalAuth } from "../middlewears/auth.middlewear";
import { validate } from "../middlewears/validate.middlewear";
import {
  createTweetSchema,
  getTweetsSchema,
  updateTweetSchema,
} from "../schemas/tweet.schema";

const tweetRouter = Router();

tweetRouter.post("/", verifyToken, validate(createTweetSchema), create);
tweetRouter.get("/", validate(getTweetsSchema), optionalAuth, getAll);
tweetRouter.get("/:id", optionalAuth, getById);
tweetRouter.delete("/:id", verifyToken, remove);
tweetRouter.patch("/:id", verifyToken, validate(updateTweetSchema), update);

export default tweetRouter;
