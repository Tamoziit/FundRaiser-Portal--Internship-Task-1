import express from "express";
import { paymentHandler, refundPaymentHandler, selfPaymentHandler } from "../controllers/payment.controller";
import verifyToken from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/initiate-payment", paymentHandler);
router.post("/initiate-selfDonation", verifyToken, selfPaymentHandler);
router.post("/refund", refundPaymentHandler);

export default router;