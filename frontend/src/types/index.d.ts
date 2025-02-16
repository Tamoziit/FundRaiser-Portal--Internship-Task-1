import { ReactNode } from "react";

export interface SignupParams {
    name: string;
    email: string;
    password: string;
    mobileNo: string;
    dob: string;
    gender: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
}

export interface LoginParams {
    email: string;
    password: string;
}

export interface AuthUser {
    _id: string;
    name: string;
    email: string;
    mobileNo: string;
    gender: "M" | "F" | "O";
    dob: string;
    address: string;
    profilePic: string;
    donations: string[];
    raisedAmount: number;
    level: string;
    code: string;
}

export interface AuthContextType {
    authUser: AuthUser | null;
    setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}

export interface AuthContextProviderProps {
    children: ReactNode;
}

export interface DashboardData {
    level: string;
    raisedAmount: number;
    target: number;
    nextLevel: string;
}

export interface LeaderBoardList {
    currentPage: number;
    totalPages: number;
    users: AuthUser[];
}