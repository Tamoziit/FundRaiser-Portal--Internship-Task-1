import express from "express";
import verifyToken from "../middlewares/auth.middleware";
import { getGirlEduTarget, getLeaderBoard, getMetadata } from "../controllers/public.controller";

const router = express.Router();

router.get("/leaderboard", verifyToken, getLeaderBoard);
router.get("/metadata", verifyToken, getMetadata);
router.get("/target", verifyToken, getGirlEduTarget);

export default router;