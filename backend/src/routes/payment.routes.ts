import express from "express";
import { paymentHandler } from "../controllers/payment.controller";

const router = express.Router();

router.post("/initiate-payment", paymentHandler);

export default router;