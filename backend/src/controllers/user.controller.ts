import { Request, Response } from "express";
import { LoginBody, SignupBody } from "../types";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateCookieAndSetCookie";
import generateReferenceCode from "../utils/generateReferenceCode";
import { client } from "../redis/client";

export const signup = async (req: Request, res: Response) => {
    try {
        const {
            name,
            email,
            password,
            mobileNo,
            dob,
            gender,
            address
        }: SignupBody = req.body;

        if (password.length < 6) {
            res.status(400).json({ error: "Password should be at least 6 characters long" });
            return;
        }
        if (mobileNo.length !== 10) {
            res.status(400).json({ error: "Enter a valid Phone no." });
            return;
        }
        if (name.length < 2) {
            res.status(400).json({ error: "Name should be at least 2 characters long" });
            return;
        }
        if (gender !== "M" && gender !== "F" && gender !== "O") {
            res.status(400).json({ error: "Enter valid gender data" });
            return;
        }

        const sameUser = await User.findOne({ $or: [{ email }, { mobileNo }] });
        if (sameUser) {
            res.status(400).json({
                error: sameUser.mobileNo === mobileNo ? "A user with this mobile no. already exists. Use another mobile no., or try logging into your account." : "A user with this Email. already exists. Use another Email., or try logging into your account."
            });
            return;
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);
        const referenceCode = `${name.substring(0, 2)}-${generateReferenceCode(7)}`;

        const newUser = new User({
            name,
            email,
            password: passwordHash,
            mobileNo,
            dob,
            gender,
            address,
            code: referenceCode
        });

        if (newUser) {
            await newUser.save();

            const token = generateTokenAndSetCookie(newUser._id, res);
            const payload = {
                token,
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                mobileNo: newUser.mobileNo,
                dob: newUser.dob,
                gender: newUser.gender,
                address: newUser.address,
                code: newUser.code
            }

            await client.set(`FR-user:${newUser._id}`, JSON.stringify(payload));
            await client.expire(`FR-user:${newUser._id}`, 30 * 24 * 60 * 60);

            res.status(201)
                .header("Authorization", `Bearer ${token}`)
                .json({
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    mobileNo: newUser.mobileNo,
                    dob: newUser.dob,
                    gender: newUser.gender,
                    address: newUser.address,
                    profilePic: newUser.profilePic,
                    code: newUser.code,
                    token
                });
        }
    } catch (error) {
        console.log("Error in Signup controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password }: LoginBody = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ error: "Cannot find User" });
            return;
        }

        const isPaswordCorrect = await bcrypt.compare(password, user.password || "");
        if (!isPaswordCorrect) {
            res.status(400).json({ error: "Invalid Login Credentials" });
            return;
        }

        res.cookie("fr_jwt", "", { maxAge: 0 });
        const token = generateTokenAndSetCookie(user._id, res);
        const payload = {
            token,
            _id: user._id,
            name: user.name,
            email: user.email,
            mobileNo: user.mobileNo,
            dob: user.dob,
            gender: user.gender,
            address: user.address,
            code: user.code
        }

        await client.set(`FR-user:${user._id}`, JSON.stringify(payload));
        await client.expire(`FR-user:${user._id}`, 30 * 24 * 60 * 60);

        res.status(201)
            .header("Authorization", `Bearer ${token}`)
            .json({
                _id: user._id,
                name: user.name,
                email: user.email,
                mobileNo: user.mobileNo,
                dob: user.dob,
                gender: user.gender,
                address: user.address,
                profilePic: user.profilePic,
                code: user.code,
                token
            });
    } catch (error) {
        console.log("Error in Login controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;

        res.cookie("fr_jwt", "", { maxAge: 0 });
        await client.del(`FR-user:${userId}`);

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in Logging out", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}