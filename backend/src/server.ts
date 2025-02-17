import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";

import connectToMongoDB from "./db/connectToMongoDb";
import { client } from "./redis/client";
import stripe from "./services/stripeInit";
import authRoutes from "./routes/auth.routes";
import profileRoutes from "./routes/profile.routes";
import publicRoutes from "./routes/public.routes";
import paymentRoutes from "./routes/payment.routes";
import donationRoutes from "./routes/donation.routes";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("common"));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.get("/api/v1", (req: Request, res: Response) => {
    res.send("<h1>Server up & Running</h1>");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/public", publicRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/donations", donationRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectToMongoDB();

    if (client) {
        console.log("Connected to Redis");
    } else {
        console.log("Error in connecting to Redis");
    }

    if (stripe) {
        console.log("Stripe Initialized");
    } else {
        console.log("Error in Initializing Stripe");
    }
});
