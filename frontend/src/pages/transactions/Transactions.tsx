import { useEffect, useState } from "react"
import { Donation } from "../../types";
import useGetDonationHistory from "../../hooks/useGetDonationHistory";
import Spinner from "../../components/Spinner";
import AppNavbar from "../../components/navbars/AppNav";
import toast from "react-hot-toast";
import formatDate from "../../utils/formatDate";

const Transactions = () => {
	const [selfDonations, setSelfDonations] = useState<Donation[] | null>([]);
	const [externalDonations, setExternalDonations] = useState<Donation[] | null>([]);
	const { loading, donationHistory } = useGetDonationHistory();
	const [currState, setCurrState] = useState<"External" | "Self">("External")

	const getDonationHistory = async () => {
		try {
			const [res1, res2] = await Promise.all([
				donationHistory("External"),
				donationHistory("Self"),
			]);

			setExternalDonations(res1);
			setSelfDonations(res2);
		} catch (error) {
			toast.error("Error fetching donation history");
			console.error("Error fetching donation history:", error);
		}
	};

	useEffect(() => {
		getDonationHistory();
	}, []);

	return (
		<div className="w-full flex flex-col items-center justify-center">
			<div className="z-20">
				<AppNavbar />
			</div>

			<div className="relative pt-24 lg:pt-30 py-4 px-8 flex flex-col items-center justify-center w-full">
				{loading ? (
					<div className="flex items-center justify-center w-full h-screen -mt-24">
						<Spinner size="large" color="primary" />
					</div>
				) : (
					<>
						<div className="flex flex-col gap-2 items-center justify-center w-[98%]">
							<h1 className="gradient-text-2 text-center text-3xl">Your Donations History</h1>
							<div className="w-full lg:w-[80%] h-[1.5px] bg-gray-400" />

							<div className="flex mt-4 gap-6 items-center justify-center w-full">
								<button className="btn-primary !px-5 !py-3.5" onClick={() => setCurrState("External")}>External Donations</button>
								<button className="w-[180px] lg:w-[200px] btn-secondary p-2" onClick={() => setCurrState("Self")}>Self Donations</button>
							</div>

							<div className="flex flex-col mt-2 gap-4 items-center justify-center w-full py-4 px-0 md:px-4">
								{currState === "External" ? (
									externalDonations && externalDonations.length > 0 ? (
										externalDonations.map((donation, _idx) => (
											<div key={_idx} className="flex flex-col md:flex-row gap-2 justify-between w-full glassmorphic-4 py-4 px-6">
												<div className="w-full md:w-1/3">
													<h2 className="mb-0.5 text-xl font-bold text-gray-300">Donor</h2>
													<div>
														<span className="font-medium text-gray-400">Name:&nbsp;</span>
														<span className="break-words font-medium">{donation.donor_name}</span>
													</div>
													<div>
														<span className="font-medium text-gray-400">Email:&nbsp;</span>
														<span className="break-words font-medium">{donation.donor_email}</span>
													</div>
													<div>
														<span className="font-medium text-gray-400">Mobile No.:&nbsp;</span>
														<span className="break-words font-medium">{donation.donor_mobileNo}</span>
													</div>
												</div>

												<div className="w-full md:w-1/3">
													<h2 className="mb-0.5 text-xl font-bold text-gray-300">Volunteer</h2>
													<div>
														<span className="font-medium text-gray-400">Name:&nbsp;</span>
														<span className="break-words font-medium">{donation.volunteer_name}</span>
													</div>
													<div>
														<span className="font-medium text-gray-400">Email:&nbsp;</span>
														<span className="break-words font-medium">{donation.volunteer_email}</span>
													</div>
													<div>
														<span className="font-medium text-gray-400">Reference Code:&nbsp;</span>
														<span className="break-words font-medium">{donation.code}</span>
													</div>
												</div>

												<div className="w-full md:hidden h-[1.5px] bg-gray-400" />

												<div>
													<h1 className="font-bold text-2xl mb-0.5 text-gray-300">Amount</h1>
													<h1 className="font-bold text-3xl">₹{donation.amount}</h1>

													<div>
														<span className="text-gray-400">
															Date:&nbsp;
														</span>
														<span>
															{formatDate(donation.createdAt)}
														</span>
													</div>
												</div>
											</div>
										))
									) : (
										<div className="w-full flex items-center justify-center">
											<h1 className="text-lg italic text-gray-600">
												You do not have an external donations from your Reference Code😔!!
											</h1>
										</div>
									)
								) : (
									selfDonations && selfDonations.length > 0 ? (
										selfDonations.map((donation, _idx) => (
											<div key={_idx} className="flex flex-col md:flex-row gap-2 justify-between w-full glassmorphic-2 py-4 px-6">
												<div className="w-full md:w-1/3">
													<h2 className="mb-0.5 text-xl font-bold text-gray-300">Donor</h2>
													<div>
														<span className="font-medium text-gray-400">Name:&nbsp;</span>
														<span className="break-words font-medium">{donation.donor_name}</span>
													</div>
													<div>
														<span className="font-medium text-gray-400">Email:&nbsp;</span>
														<span className="break-words font-medium">{donation.donor_email}</span>
													</div>
													<div>
														<span className="font-medium text-gray-400">Mobile No.:&nbsp;</span>
														<span className="break-words font-medium">{donation.donor_mobileNo}</span>
													</div>
												</div>

												<div className="w-full md:w-1/3">
													<h2 className="mb-0.5 text-xl font-bold text-gray-300">Volunteer</h2>
													<div>
														<span className="font-medium text-gray-400">Name:&nbsp;</span>
														<span className="break-words font-medium">{donation.volunteer_name}</span>
													</div>
													<div>
														<span className="font-medium text-gray-400">Email:&nbsp;</span>
														<span className="break-words font-medium">{donation.volunteer_email}</span>
													</div>
													<div>
														<span className="font-medium text-gray-400">Reference Code:&nbsp;</span>
														<span className="break-words font-medium">{donation.code}</span>
													</div>
												</div>

												<div className="w-full md:hidden h-[1.5px] bg-gray-400" />

												<div>
													<h1 className="font-bold text-2xl mb-0.5 text-gray-300">Amount</h1>
													<h1 className="font-bold text-3xl">₹{donation.amount}</h1>

													<div>
														<span className="text-gray-400">
															Date:&nbsp;
														</span>
														<span>
															{formatDate(donation.createdAt)}
														</span>
													</div>
												</div>
											</div>
										))
									) : (
										<div className="w-full flex items-center justify-center">
											<h1 className="text-lg italic text-gray-300">
												You have not made any donations yourself😔!!
											</h1>
										</div>
									)
								)}
							</div>
						</div>
					</>
				)
				}
			</div>
		</div>
	)
}

export default Transactions;