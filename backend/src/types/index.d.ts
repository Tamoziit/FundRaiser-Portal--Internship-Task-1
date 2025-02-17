import { Types } from "mongoose";
import { Request } from "express";

export interface AdminToken {
    password: string
}

export interface User {
    _id: Types.ObjectId;
    name: string;
    email: string;
    mobileNo: string;
    gender: "M" | "F" | "O";
    dob: string;
    address: string;
    profilePic?: string | null;
    donations: Types.ObjectId[];
    raisedAmount: number;
    level: string;
    code: string;
    createdAt: Date;
    updatedAt: Date;
}

declare module "express" {
    export interface Request {
        user?: User;
    }
}

export interface SignupBody {
    name: string;
    email: string;
    password: string;
    mobileNo: string;
    gender: "M" | "F" | "O";
    dob: string;
    address: string;
}

export interface LoginBody {
    email: string;
    password: string;
}

export interface DonationBody {
    id: Types.ObjectId;
    session_id: string;
    amount: number;
}