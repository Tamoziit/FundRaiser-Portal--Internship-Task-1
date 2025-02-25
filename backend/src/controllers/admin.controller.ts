import { Request, Response } from "express";
import { client } from "../redis/client";
import jwt from "jsonwebtoken";
import { AdminToken } from "../types";

export const getAdminToken = async(req: Request, res: Response) => {
    try {
        const { password }: AdminToken = req.body;
        const adminPassword = process.env.ADMIN_PASSWORD!;

        if (password !== adminPassword) {
            res.status(401).json({ error: "Invalid Admin Credentials" });
            return;
        }

        const payload = {
            adminPassword,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "5h" });
        res.status(200).json(token);
    } catch (error) {
        console.log("Error in getting Admin Token", error);
        res.status(500).json({ error: "Internal Server error" });
    }
}

export const updateMetadata = async(req: Request, res: Response) => {
    try {
        const updates = req.body;

        if (!updates || typeof updates !== "object") {
            res.status(400).json({ error: "Invalid request data" });
            return;
        }

        const metadata = await client.get("metadata");
        let metadataObj = metadata ? JSON.parse(metadata) : { volunteers: 0, amount: 0 };

        Object.keys(updates).forEach((key) => {
            if (key === "volunteers" || key === "amount") {
                metadataObj[key] = Number(updates[key]);
            } else {
                metadataObj[key] = updates[key];
            }
        });

        await client.set("metadata", JSON.stringify(metadataObj));

        res.status(200).json({ message: "Metadata updated successfully", metadata: metadataObj });
    } catch (error) {
        console.error("Error updating metadata:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}