import { Router } from "express";
import { register, login, me } from "../controllers/auth.controller";
import { validate } from "../middlewears/validate.middlewear";
import { verifyToken } from "../middlewears/auth.middlewear";
import { registerSchema, loginSchema } from "../schemas/auth.schema";

const authRouter = Router();

authRouter.post("/register", validate(registerSchema), register);
authRouter.post("/login", validate(loginSchema), login);
authRouter.get("/me", verifyToken, me);

export default authRouter;
