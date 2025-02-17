import { useState } from "react"
import toast from "react-hot-toast";
import { ConfirmDonationProps } from "../types";

const useProcessDonation = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const donation = async ({
        id,
        session_id,
        amount
    }: ConfirmDonationProps) => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/donations/process-donation`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("FR-token")}`
                },
                body: JSON.stringify({ id, session_id, amount })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            if (data) {
                toast.success("Donation made Successfully!")
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

    return { loading, donation }
}

export default useProcessDonation;