import { Router } from "express";
import { verifyToken } from "../middlewears/auth.middlewear";
import { createLikeController, deleteLikeController } from "../controllers/like.controller";

const likeRouter = Router()

likeRouter.post("/:id/like", verifyToken, createLikeController);
likeRouter.delete("/:id/like", verifyToken, deleteLikeController);

export default likeRouter;