import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { AuthUser } from "../../types";
import useGetVolunteerData from "../../hooks/useGetVolunteerInfo";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner";
import useSelfPaymentHandler from "../../hooks/useSelfPaymentHandler";

const SelfDonationForm = () => {
	const { code } = useParams();
	const [volunteerData, setVolunteerData] = useState<AuthUser | null>();
	const { loading, volunteerInfo } = useGetVolunteerData();
	const [tempAmt, setTempAmt] = useState<string>("50");
	const { loading: paying, payment } = useSelfPaymentHandler();

	const getVolunteerInfo = async () => {
		if (code) {
			const data = await volunteerInfo(code);
			setVolunteerData(data);
		} else {
			toast.error("Error in fetching Reference Code");
		}
	}

	useEffect(() => {
		getVolunteerInfo();
	}, []);

	const handlePayment = async () => {
		if (volunteerData) {
			const body = {
				id: volunteerData._id,
				name: volunteerData.name,
				code: volunteerData.code,
				amount: Number(tempAmt),
				profilePic: volunteerData.profilePic,
			}

			const res = await payment(body);

			if (res.url) {
				window.location.href = res.url;
			}
		} else {
			toast.error("Error in Initiating Payment. Try Again Later");
		}
	}

	return (
		<div className="flex w-full h-screen items-center justify-center">
			<div
				className="absolute inset-0 bg-[url('/Logo.png')] bg-center bg-contain bg-no-repeat opacity-50 md:opacity-40"
			/>
			{loading ? (
				<div className="flex items-center justify-center w-full h-screen">
					<Spinner size="large" color="primary" />
				</div>
			) : (
				<div className="glassmorphic-2 !backdrop-blur-xl py-4 px-4 md:px-8 flex flex-col items-center justify-center gap-3 w-[90%] md:w-[55%] lg:w-[35%]">
					<div className="flex flex-col justify-center items-center gap-0.5">
						<img src={volunteerData?.profilePic || "/placeholderImg.png"} alt="Profile Img" className="size-36 rounded-full border-4 border-gray-300 mb-2.5" />
						<h1 className="text-3xl font-semibold text-gray-100">
							{volunteerData?.name}
						</h1>
						<h2 className="text-lg font-semibold text-gray-300">
							{volunteerData?.code}
						</h2>
					</div>

					<div className="flex flex-col w-full items-center gap-2 justify-center mt-10">
						<div className="w-full flex items-center justify-center gap-2">
							<span className="text-5xl font-semibold text-gray-300">
								₹
							</span>
							<input
								type="text"
								className="outline-none border-b border-b-gray-200 focus:bg-black/20 focus:rounded-sm text-4xl w-[50%] text-center font-bold text-gray-200 py-[1px]"
								value={tempAmt}
								onChange={(e) => setTempAmt(e.target.value)}
							/>
						</div>
						<p className="text-sm text-gray-400 text-center">*min. amount required: ₹50</p>
					</div>

					<div className="w-full flex items-center justify-center mt-6">
						<p className="text-xl font-bold text-gray-200 text-center">
							✨🤝Together, Let's Make a Difference!!🤝✨
						</p>
					</div>

					<div className="w-[90%] flex items-center justify-center mt-5 mb-1.5">
						<button
							className="btn-submit !text-2xl hover:!bg-blue-600 focus:!ring-blue-400 w-full"
							onClick={handlePayment}
							disabled={paying || loading}
						>
							{paying ? <Spinner size="small" color="primary" /> : "Pay with Stripe"}
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default SelfDonationForm;