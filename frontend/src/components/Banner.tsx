import { useEffect, useState } from "react";
import { FaHandHoldingHeart, FaUsers } from "react-icons/fa"
import useGetMetadata from "../hooks/useGetMetadata";
import Spinner from "./Spinner";

const Banner = () => {
    const [metadata, setMetadata] = useState<{ volunteers: number; amount: number }>({
        volunteers: 0,
        amount: 0,
    });
    const { loading, getMetadata } = useGetMetadata();

    const fetchMetadata = async () => {
        const data = await getMetadata();
        setMetadata(data);
    }

    useEffect(() => {
        fetchMetadata();
    }, []);

    return (
        <div className="card-2 text-white p-4 md:p-6 rounded-lg flex w-full justify-around items-center shadow-lg">
            {loading ? (
                <Spinner size="medium" color="primary" />
            ) : (
                <>
                    <div className="flex items-center space-x-4">
                        <FaUsers className="text-3xl md:text-5xl text-gray-800" />
                        <div>
                            <p className="text-base md:text-xl font-semibold text-gray-700">Total Volunteers</p>
                            <p className="text-2xl md:text-4xl font-bold">{metadata.volunteers.toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <FaHandHoldingHeart className="text-3xl md:text-5xl text-gray-800" />
                        <div>
                            <p className="text-base md:text-xl font-semibold text-gray-700">Total Donations</p>
                            <p className="text-2xl md:text-4xl font-bold">₹{metadata.amount.toLocaleString()}</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Banner