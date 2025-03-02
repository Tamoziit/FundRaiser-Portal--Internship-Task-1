import { useLocation } from "react-router-dom";
import useProcessRefund from "../../hooks/useProcessRefund";
import { useState } from "react";
import { RefundProps } from "../../types";
import Spinner from "../../components/Spinner";

const Refund = () => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const sessionId = queryParams.get("session_id");
	const name = queryParams.get("name");
	const referenceCode = queryParams.get("referenceCode");
	const amount = queryParams.get("amount");

	const { loading, refund } = useProcessRefund();
	const [refundData, setRefundData] = useState<RefundProps | null>();

	const fetchRefund = async () => {
		if (sessionId) {
			const data = await refund(sessionId);
			setRefundData(data);
		}
	}

	console.log(refundData);

	return (
		<div className="flex flex-col w-full h-screen items-center justify-center">
			<div
				className="absolute inset-0 bg-[url('/collage.png')] bg-center bg-cover md:bg-contain bg-no-repeat opacity-75"
			/>

			<div className="glassmorphic-2 !backdrop-blur-xl py-4 px-4 md:px-8 flex flex-col items-center justify-center gap-3 w-[90%] md:w-[55%] lg:w-[35%]">
				<div className="flex items-center justify-center w-full gap-3 mb-2">
					<img src="/homeLogo.png" alt="logo" className="size-20" />
					<h1 className="gradient-text-3 font-bold text-2xl lg:text-3xl">NayePankh Foundation</h1>
				</div>

				{refundData ? (
					<>
						<h1 className="text-xl md:text-2xl font-semibold text-center text-gray-800">🎊Donation Successful🎉</h1>

						<div className="h-[0.8px] w-full lg:w-[90%] bg-gray-800" />

						<div className="flex flex-col justify-center w-full">
							<div className="flex flex-wrap items-center w-full">
								<span className="font-semibold text-gray-800">Payment Id:&nbsp;</span>
								<span className="break-all font-medium">{refundData.payment_intent}</span>
							</div>

							<div className="flex flex-wrap items-center w-full">
								<span className="font-semibold text-gray-800">Refund Id:&nbsp;</span>
								<span className="break-all font-medium">{refundData.id}</span>
							</div>

							<div className="flex flex-wrap items-center w-full">
								<span className="font-semibold text-gray-800">Reason:&nbsp;</span>
								<span className="break-all font-medium">{refundData.reason}</span>
							</div>

							<div className="h-[0.8px] w-full bg-gray-800 my-3" />

							<div className="flex flex-wrap items-center w-full text-xl">
								<span className="font-semibold text-gray-800">Amount:&nbsp;</span>
								<span className="whitespace-nowrap font-bold">₹{refundData.amount / 100}</span>
							</div>

							<span className="text-sm mt-2 text-gray-900">*Your Bank Account will be updated within 5-6 days</span>
						</div>
					</>
				) : (
					<>
						<h1 className="text-xl md:text-2xl font-semibold text-center text-gray-800">Are you sure you want a Refund?</h1>

						<div className="h-[0.8px] w-full lg:w-[90%] bg-gray-800" />

						<div className="flex flex-col justify-center w-full z-10">
							<div className="flex flex-wrap items-center w-full">
								<span className="font-semibold text-gray-800">Session Id:&nbsp;</span>
								<span className="break-all font-medium">{sessionId}</span>
							</div>

							<div className="flex flex-wrap items-center w-full z-10">
								<span className="font-semibold text-gray-800">Volunteer Name:&nbsp;</span>
								<span className="break-words font-medium">{name}</span>
							</div>

							<div className="flex flex-wrap items-center w-full z-10">
								<span className="font-semibold text-gray-800">Reference Code:&nbsp;</span>
								<span className="break-all font-medium">{referenceCode}</span>
							</div>

							<div className="h-[0.8px] w-full bg-gray-800 my-3" />

							<div className="flex flex-wrap items-center w-full text-xl z-10">
								<span className="font-semibold text-gray-800">Amount:&nbsp;</span>
								<span className="whitespace-nowrap font-bold">₹{amount}</span>
							</div>

							<button
								className="mt-2 mb-1 btn-submit w-full lg:w-[80%] z-10"
								disabled={loading}
								onClick={fetchRefund}
							>
								{loading ? <Spinner size="small" color="secondary" /> : "Refund"}
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default Refund;