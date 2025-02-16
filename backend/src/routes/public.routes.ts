import express from "express";
import verifyToken from "../middlewares/auth.middleware";
import { getLeaderBoard } from "../controllers/public.controller";

const router = express.Router();

router.get("/leaderboard", verifyToken, getLeaderBoard);

export default router;