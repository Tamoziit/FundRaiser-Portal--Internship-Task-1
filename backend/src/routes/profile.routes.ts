import express from "express";
import verifyToken from "../middlewares/auth.middleware";
import { getDashboardData, getProfile, updateProfilePic } from "../controllers/profile.controller";

const router = express.Router();

router.get("/my-profile", verifyToken, getProfile);
router.patch("/update-profilePic", verifyToken, updateProfilePic);
router.get("/get-dashboardData", verifyToken, getDashboardData);

export default router;