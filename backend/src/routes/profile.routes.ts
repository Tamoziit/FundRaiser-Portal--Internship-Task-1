import express from "express";
import verifyToken from "../middlewares/auth.middleware";
import { getProfile, updateProfilePic } from "../controllers/profile.controller";

const router = express.Router();

router.get("/my-profile", verifyToken, getProfile);
router.patch("/update-profilePic", verifyToken, updateProfilePic);

export default router;