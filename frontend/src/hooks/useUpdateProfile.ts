import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useUpdateProfile = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const apiUrl = import.meta.env.VITE_API_URL;

    const profilePic = async (profilePic: string) => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/profile/update-profilePic`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("FR-token")}`
                },
                body: JSON.stringify({ profilePic })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            localStorage.setItem("FR-token", data.token);
            localStorage.setItem("FR-user", JSON.stringify(data));
            setAuthUser(data);

            if (data) {
                toast.success("Profile updated successfully");
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

    return { loading, profilePic }
}

export default useUpdateProfile;