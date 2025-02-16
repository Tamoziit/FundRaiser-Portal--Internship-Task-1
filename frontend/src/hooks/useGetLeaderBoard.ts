import { useState } from "react"
import toast from "react-hot-toast";

export interface LeaderBoardProps {
    page: number;
}

const useGetLeaderBoard = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const leaderboard = async ({page}: LeaderBoardProps) => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/public/leaderboard?page=${page}&limit=10`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("FR-token")}`
                },
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            if (data) {
                return data;
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
                console.log(error);
            } else {
                console.log("An unknown error occurred", error);
            }
        } finally {
            setLoading(false);
        }
    }

    return { loading, leaderboard }
}

export default useGetLeaderBoard;