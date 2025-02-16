import express from "express";
import { login, logout, signup } from "../controllers/user.controller";
import verifyToken from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout/:id", logout);

export default router;