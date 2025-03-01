import { Request, Response } from "express";
import User from "../models/user.model";
import { levels } from "../data/constants";

interface ProfilePicProps {
    profilePic: string;
}

export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;

        if (userId) {
            res.status(200).json(req.user);
        } else {
            res.status(400).json({ error: "Error in fetching profile details" });
        }
    } catch (error) {
        console.log("Error in getProfile controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const updateProfilePic = async (req: Request, res: Response) => {
    try {
        const { profilePic }: ProfilePicProps = req.body;
        if (!profilePic) {
            res.status(400).json({ error: "Profile picture is required" });
            return;
        }
        const user = await User.findById(req.user?._id);
        if (!user) {
            res.status(400).json({ error: "Cannot find user" });
            return;
        }

        user.profilePic = profilePic;
        await user.save();

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            mobileNo: user.mobileNo,
            dob: user.dob,
            gender: user.gender,
            address: user.address,
            profilePic: user.profilePic,
            code: user.code,
            token: req.headers.authorization?.split(" ")[1]
        })
    } catch (error) {
        console.log("Error in updateProfilePic controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getDashboardData = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.user?._id);
        if (!user) {
            res.status(400).json({ error: "Cannot find User" });
            return;
        }

        let target = 0;
        let nextLevel = "Max Level Achieved";

        for (let i = 0; i < levels.length; i++) {
            if (user.raisedAmount >= levels[i].start && user.raisedAmount <= levels[i].target) {
                target = levels[i].target;
                nextLevel = levels[i + 1] ? levels[i + 1].level : "Max Level Achieved";
                break;
            }
        }

        // If user is at the last level, appling dynamic 20,000 increment of target
        if (nextLevel === "Max Level Achieved") {
            target = Math.ceil(user.raisedAmount / 20000) * 20000 + 20000;
        }

        res.status(200).json({
            level: user.level,
            raisedAmount: user.raisedAmount,
            target,
            nextLevel,
        });

    } catch (error) {
        console.error("Error in getDashboardData controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};