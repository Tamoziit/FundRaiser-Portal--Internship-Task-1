import express from "express";
import { paymentHandler, selfPaymentHandler } from "../controllers/payment.controller";
import verifyToken from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/initiate-payment", paymentHandler);
router.post("/initiate-selfDonation", verifyToken, selfPaymentHandler);

export default router;