import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route";
import tweetRouter from "./routes/tweet.route";
import likeRouter from "./routes/like.route";
import { errorMiddleware } from "./middlewears/error.middlewear";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Twitter Clone API is running",
  });
});

//routes
app.use("/auth", authRouter);
app.use("/tweets", tweetRouter);
app.use("/tweets", likeRouter);

//Global error handler
app.use(errorMiddleware);

export default app;