import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { AuthUser } from "../../types";
import useGetVolunteerData from "../../hooks/useGetVolunteerInfo";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner";
import usePaymentHandler from "../../hooks/usePaymentHandler";

const DonationForm = () => {
	const { code } = useParams();
	const [volunteerData, setVolunteerData] = useState<AuthUser | null>();
	const { loading, volunteerInfo } = useGetVolunteerData();
	const [tempAmt, setTempAmt] = useState<string>("50");
	const { loading: paying, payment } = usePaymentHandler();

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
				className="absolute inset-0 bg-[url('/collage.png')] bg-center bg-cover md:bg-contain bg-no-repeat opacity-75"
			/>
			{loading ? (
				<div className="flex items-center justify-center w-full h-screen">
					<Spinner size="large" color="primary" />
				</div>
			) : (
				<div className="glassmorphic-2 !backdrop-blur-xl py-4 px-4 md:px-8 flex flex-col items-center justify-center gap-3 w-[90%] md:w-[55%] lg:w-[35%]">
					<div className="flex items-center justify-center w-full gap-3 mb-2">
						<img src="/homeLogo.png" alt="logo" className="size-20" />
						<h1 className="gradient-text-3 font-bold text-2xl lg:text-3xl">NayePankh Foundation</h1>
					</div>

					<div className="flex flex-col justify-center items-center gap-0.5 z-10">
						<img src={volunteerData?.profilePic || "/placeholderImg.png"} alt="Profile Img" className="size-36 rounded-full border-4 border-gray-200 mb-2.5" />
						<h1 className="text-3xl flex flex-col items-center justify-center font-semibold text-gray-800">
							{volunteerData?.name}
							<span className="text-base text-gray-600">(Volunteer)</span>
						</h1>
						<h2 className="text-lg font-semibold text-gray-700 mt-1">
							{volunteerData?.code}
						</h2>
					</div>

					<div className="flex flex-col w-full items-center gap-2 justify-center mt-10 z-10">
						<div className="w-full flex items-center justify-center gap-2">
							<span className="text-5xl font-semibold text-gray-800">
								₹
							</span>
							<input
								type="text"
								className="outline-none border-b border-b-gray-800 focus:bg-white/30 focus:rounded-sm text-4xl w-[50%] text-center font-bold text-gray-800 py-[1px]"
								value={tempAmt}
								onChange={(e) => setTempAmt(e.target.value)}
							/>
						</div>
						<p className="text-sm text-gray-800 text-center">*min. amount required: ₹50</p>
					</div>

					<div className="w-full flex items-center justify-center mt-6 z-10">
						<p className="text-xl font-bold text-gray-100 bg-clip-border text-center" style={{ textShadow: '2px 1.5px 4px rgba(0, 0, 0, 0.5)' }}>
							✨🤝Together, Let's Make a Difference!!🤝✨
						</p>
					</div>

					<div className="w-[90%] flex items-center justify-center mt-5 mb-1.5 z-20">
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

export default DonationForm;