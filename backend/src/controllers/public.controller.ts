import { Request, Response } from "express";
import User from "../models/user.model";
import { client } from "../redis/client";

export const getLeaderBoard = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const users = await User.find()
            .sort({ raisedAmount: -1 }) // Sorting in descending order acc. to amt. raised
            .skip(skip)
            .limit(limit);

        const totalUsers = await User.countDocuments();

        res.status(200).json({
            users,
            totalPages: Math.ceil(totalUsers / limit),
            currentPage: page,
        });
    } catch (error) {
        console.error("Error in getLeaderBoard controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getMetadata = async (req: Request, res: Response) => {
    try {
        const metadata = await client.get("metadata");
        const data = metadata ? JSON.parse(metadata) : { volunteers: 0, amount: 0 };
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(400).json({ error: "Error in fetching metadata" });
        }
    } catch (error) {
        console.error("Error in getMetadata controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}