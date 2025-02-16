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
            res.status(400).json({ error: "Cannot find user" });
            return;
        }

        let target, nextLevel;
        levels.forEach((level, _idx) => {
            if (user.raisedAmount >= level.start && user.raisedAmount <= level.target) {
                target = level.target;
                nextLevel = levels[_idx + 1].level;
            }
        });

        res.status(200).json({
            level: user.level,
            raisedAmount: user.raisedAmount,
            target,
            nextLevel
        })
    } catch (error) {
        console.log("Error in getDashboardData controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}