import express from "express";
import { getMyTransactions, getVolunteerInfo, processDonation } from "../controllers/donations.controller";
import verifyToken from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/process-donation", processDonation);
router.get("/get-volunteerInfo/:code", getVolunteerInfo);
router.get("/transactions", verifyToken, getMyTransactions);

export default router;