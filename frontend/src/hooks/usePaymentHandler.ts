import { useState } from "react"
import toast from "react-hot-toast";
import { PaymentProps } from "../types";

const usePaymentHandler = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const payment = async ({
        id,
        name,
        code,
        amount,
        profilePic
    }: PaymentProps) => {
        const success = validator(amount);
        if(!success) return;
        
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/payments/initiate-payment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("FR-token")}`
                },
                body: JSON.stringify({ id, name, code, amount, profilePic })
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

    return { loading, payment }
}

export default usePaymentHandler;


function validator(amount: number) {
    if(amount < 50) {
        toast.error("Minimum amount required is ₹50");
        return false;
    }

    return true;
}