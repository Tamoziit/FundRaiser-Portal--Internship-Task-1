import { useEffect, useState } from "react";
import AppNavbar from "../../components/navbars/AppNav";
import Spinner from "../../components/Spinner";
import { useAuthContext } from "../../context/AuthContext";
import useGetDashboardData from "../../hooks/useGetDashboardData";
import { DashboardData, EduTarget } from "../../types";
import { FaAward } from "react-icons/fa";
import { PiTargetBold } from "react-icons/pi";
import { GiGrowth } from "react-icons/gi";
import ProgressBar from "../../components/ProgressBar";
import CTA from "../../components/CTA";
import { useNavigate } from "react-router-dom";
import Contact from "../../components/Contact";
import CircularProgress from "../../components/CircularProgress";
import useGetTarget from "../../hooks/useGetTarget";

const Dashboard = () => {
	const { authUser } = useAuthContext();
	const { loading, dashboard } = useGetDashboardData();
	const [dashboardData, setDashboardData] = useState<DashboardData | null>();
	const [eduTarget, setEduTarget] = useState<EduTarget | null>();
	const { loading: enloading, getTarget } = useGetTarget();
	const navigate = useNavigate();

	const getDashboardData = async () => {
		const data = await dashboard();
		setDashboardData(data);
	}

	const fetchEduTarget = async () => {
		const data = await getTarget();
		setEduTarget(data);
	}

	useEffect(() => {
		getDashboardData();
		fetchEduTarget();
	}, []);

	const goals = [
		"Education for Underprivileged Children",
		"Providing Nutritious Meals",
		"Clothing for the Needy",
		"Distributing Blankets",
		"Promoting Menstrual Hygiene",
		"Caring for Stray Animals"
	]

	return (
		<div className="w-full flex flex-col items-center justify-center">
			<div className="z-20">
				<AppNavbar />
			</div>

			<div className="pt-24 lg:pt-30 py-4 px-8 flex flex-col items-center justify-center w-full">
				{loading ? (
					<div className="flex items-center justify-center w-full h-screen -mt-24">
						<Spinner size="large" color="primary" />
					</div>
				) : (
					<>
						<div className="card-2 w-full lg:w-[80%] flex flex-col md:flex-row items-center justify-between px-8 py-3">
							<img
								src={authUser?.profilePic || "/placeholderImg.png"}
								alt="profile_bg"
								className="w-30 h-30 rounded-full object-cover border-2 border-gray-200 z-20"
							/>

							<div className="flex flex-col items-center justify-center mt-3 md:mt-0 md:items-end z-20">
								<span className="text-2xl font-bold text-gray-50">{authUser?.name}</span>
								<span className="font-medium text-gray-300">{authUser?.email}</span>
								<span className="font-normal text-gray-300">{authUser?.mobileNo}</span>
							</div>
						</div>

						<div className="mt-10 flex w-full flex-col gap-4 items-center justify-center">
							<h1 className="gradient-text-1 text-4xl">Your Stats</h1>
							<div className="w-full lg:w-[80%] h-[1.5px] bg-gray-500" />

							{dashboardData ? (
								<div className="flex flex-col md:flex-row gap-4 w-full lg:w-[75%] items-center justify-between px-8">
									<div className="glassmorphic-4 py-4 w-full h-[220px] items-center justify-center">
										<div className="flex flex-col items-center justify-center w-full h-full gap-0.5">
											<h1 className="text-lg font-semibold text-gray-50">Amount Raised</h1>
											<ProgressBar
												raisedAmount={dashboardData!.raisedAmount}
												target={dashboardData!.target}
											/>
											<span className="text-xl font-bold text-gray-50">₹ {dashboardData!.raisedAmount}</span>
										</div>
									</div>

									<div className="glassmorphic-4 py-4 w-full h-[220px] items-center justify-center">
										<div className="flex flex-col w-full h-full gap-0.5">
											<div className="w-full flex flex-col items-center justify-center">
												<h2 className="text-lg font-semibold text-gray-300">Your Level</h2>
												<FaAward className="text-gray-200 text-4xl" />
												<span className="text-xl font-bold text-gray-50">{dashboardData!.level}</span>
											</div>
											<div className="w-full flex flex-col items-center justify-center">
												<h2 className="text-lg font-semibold text-gray-300">Your Target</h2>
												<PiTargetBold className="text-gray-200 text-4xl" />
												<span className="text-xl font-bold text-gray-50">₹{dashboardData!.target}</span>
											</div>
										</div>
									</div>

									<div className="glassmorphic-4 py-4 w-full h-[220px] items-center justify-center">
										<div className="w-full h-full flex flex-col items-center justify-center">
											<h2 className="text-xl font-semibold text-gray-300">Next Level</h2>
											<GiGrowth className="text-gray-200 text-6xl" />
											<span className="text-3xl font-bold text-gray-50 text-center">{dashboardData!.nextLevel}</span>
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
				<div className="mt-6 w-full lg:w-[80%] h-[1.5px] bg-gray-500" />

				<div className="flex flex-col gap-3 items-center justify-center py-5 w-full">
					<CTA />
					<button className="btn-submit !rounded-md !py-3 !px-19" onClick={() => navigate(`/donate/self/${authUser?.code}`)}>
						Donate Yourself
					</button>
				</div>
			</div>

			<div className="flex flex-col md:flex-row w-full lg:w-[80%] items-center justify-center gap-6 md:gap-28 px-6 py-4">
				<div className="flex flex-col items-center justify-center gap-2">
					{enloading ? (
						<Spinner size="medium" color="accent" />
					) : (
						<div>
							{eduTarget ? (
								<>
									<CircularProgress
										target={eduTarget.target}
										amount={eduTarget.amount}
										pic1="/girl.png"
										pic2="/girlReading.png"
									/>
									<div className="text-center">
										<h1 className="text-xl font-semibold text-gray-700">Educate One Girl</h1>
										<span className="flex items-center w-full justify-center gap-2 text-3xl font-semibold text-gray-600">Goal: <h1 className="font-bold text-gray-800">₹{eduTarget.target}</h1></span>
									</div>
								</>
							) : (
								<span>Data Unavailable</span>
							)}
						</div>
					)}
				</div>

				<div className="flex flex-col justify-center h-full relative">
					<h1 className="text-3xl text-center md:text-left font-bold text-gray-800 mb-1.5">Our Goals</h1>

					<ul className="list-disc pl-5 font-medium text-gray-600 text-lg">
						{goals.map((goal, _idx) => (
							<li key={_idx}>{goal}</li>
						))}
					</ul>
				</div>
			</div>

			<Contact />
		</div>
	)
}

export default Dashboard;