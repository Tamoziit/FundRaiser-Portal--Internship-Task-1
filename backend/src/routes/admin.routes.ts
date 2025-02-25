import express from "express";
import { getAdminToken, updateMetadata } from "../controllers/admin.controller";
import verifyAdmin from "../middlewares/admin.middleware";

const router = express.Router();

router.post("/get-token", getAdminToken);
router.patch("/update-metadata", verifyAdmin, updateMetadata);

export default router;