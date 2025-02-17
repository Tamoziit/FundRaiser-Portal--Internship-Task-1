import express from "express";
import { getVolunteerInfo, processDonation } from "../controllers/donations.controller";

const router = express.Router();

router.post("/process-donation", processDonation);
router.get("/get-volunteerInfo/:code", getVolunteerInfo);

export default router;