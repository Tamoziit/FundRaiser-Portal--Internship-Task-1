import express from "express";
import verifyToken from "../middlewares/auth.middleware";
import { getLeaderBoard, getMetadata } from "../controllers/public.controller";

const router = express.Router();

router.get("/leaderboard", verifyToken, getLeaderBoard);
router.get("/metadata", verifyToken, getMetadata);

export default router;