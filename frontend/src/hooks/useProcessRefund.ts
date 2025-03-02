import { useState } from "react"
import toast from "react-hot-toast";

const useProcessRefund = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const refund = async (session_id: string) => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/payments/refund`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("FR-token")}`
                },
                body: JSON.stringify({ session_id })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            if (data) {
                toast.success("Refund Successful!")
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

    return { loading, refund }
}

export default useProcessRefund;