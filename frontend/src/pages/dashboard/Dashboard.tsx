import { useEffect, useState } from "react";
import AppNavbar from "../../components/navbars/AppNav";
import Spinner from "../../components/Spinner";
import { useAuthContext } from "../../context/AuthContext";
import useGetDashboardData from "../../hooks/useGetDashboardData";
import { DashboardData } from "../../types";
import { FaAward } from "react-icons/fa";
import { PiTargetBold } from "react-icons/pi";
import { GiGrowth } from "react-icons/gi";
import ProgressBar from "../../components/ProgressBar";
import CTA from "../../components/CTA";

const Dashboard = () => {
	const { authUser } = useAuthContext();
	const { loading, dashboard } = useGetDashboardData();
	const [dashboardData, setDashboardData] = useState<DashboardData | null>();

	const getDashboardData = async () => {
		const data = await dashboard();
		setDashboardData(data);
	}

	useEffect(() => {
		getDashboardData();
	}, []);
	console.log(dashboardData);

	return (
		<div>
			<AppNavbar />

			<div className="pt-24 lg:pt-30 py-4 px-8 flex flex-col items-center justify-center">
				{loading ? (
					<div className="flex items-center justify-center w-full h-screen -mt-24">
						<Spinner size="large" color="primary" />
					</div>
				) : (
					<>
						<div className="glassmorphic-4 w-full lg:w-[80%] flex flex-col md:flex-row items-center justify-between px-8 py-3">
							<img
								src={authUser?.profilePic || "/placeholderImg.png"}
								alt="profile_bg"
								className="w-30 h-30 rounded-full object-cover border-2 border-gray-400"
							/>

							<div className="flex flex-col items-center justify-center mt-3 md:mt-0 md:items-end">
								<span className="text-2xl font-bold text-gray-50">{authUser?.name}</span>
								<span className="font-medium text-gray-700">{authUser?.email}</span>
								<span className="font-normal text-gray-800">{authUser?.mobileNo}</span>
							</div>
						</div>

						<div className="mt-10 flex w-full flex-col gap-4 items-center justify-center">
							<h1 className="gradient-text-2 text-3xl">Your Stats</h1>
							<div className="w-full lg:w-[80%] h-[1.5px] bg-gray-500" />

							{dashboardData ? (
								<div className="flex flex-col md:flex-row gap-4 w-full lg:w-[75%] items-center justify-between px-8">
									<div className="glassmorphic-2 py-4 w-full h-[220px] items-center justify-center">
										<div className="flex flex-col items-center justify-center w-full h-full gap-0.5">
											<h1 className="text-lg font-semibold text-gray-700">Amount Raised</h1>
											<ProgressBar
												raisedAmount={dashboardData!.raisedAmount}
												target={dashboardData!.target}
											/>
											<span className="text-xl font-bold text-gray-200">₹ {dashboardData!.raisedAmount}</span>
										</div>
									</div>

									<div className="glassmorphic-2 py-4 w-full h-[220px] items-center justify-center">
										<div className="flex flex-col w-full h-full gap-0.5">
											<div className="w-full flex flex-col items-center justify-center">
												<h2 className="text-lg font-semibold text-gray-700">Your Level</h2>
												<FaAward className="text-gray-300 text-4xl" />
												<span className="text-xl font-bold text-gray-200">{dashboardData!.level}</span>
											</div>
											<div className="w-full flex flex-col items-center justify-center">
												<h2 className="text-lg font-semibold text-gray-700">Your Target</h2>
												<PiTargetBold className="text-gray-300 text-4xl" />
												<span className="text-xl font-bold text-gray-200">{dashboardData!.target}</span>
											</div>
										</div>
									</div>

									<div className="glassmorphic-2 py-4 w-full h-[220px] items-center justify-center">
										<div className="w-full h-full flex flex-col items-center justify-center">
											<h2 className="text-xl font-semibold text-gray-700">Next Level</h2>
											<GiGrowth className="text-gray-300 text-6xl" />
											<span className="text-3xl font-bold text-gray-200">{dashboardData!.nextLevel}</span>
										</div>
									</div>
								</div>
							) : (
								<div className="w-full flex items-center justify-center">
									<h1 className="text-lg italic text-gray-600">
										No Stats Available!!
									</h1>
								</div>
							)}
						</div>
					</>
				)}
				<div className="mt-6 w-full lg:w-[80%] h-[1.5px] bg-gray-600" />

				<div className="flex py-5 w-full">
					<CTA />
				</div>
			</div>
		</div>
	)
}

export default Dashboard