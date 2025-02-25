import { useState } from "react";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { MdOutlineLogout } from "react-icons/md";
import useLogout from "../../hooks/useLogout";
import { IoStatsChartSharp } from "react-icons/io5";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { FaTrophy } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const AppNavbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { loading, logout } = useLogout();

	const items = [
		{
			name: "Home",
			icon: <FaHome className="text-gray-700 font-bold" />,
			link: "/home",
		},
		{
			name: "Dashboard",
			icon: <IoStatsChartSharp className="text-gray-700 font-bold" />,
			link: "/dashboard",
		},
		{
			name: "Transactions",
			icon: <RiMoneyRupeeCircleFill className="text-gray-700 font-bold" />,
			link: "/transactions",
		},
		{
			name: "Leaderboard",
			icon: <FaTrophy className="text-gray-700 font-bold" />,
			link: "/leaderboard",
		},
		{
			name: "Mission",
			icon: <VscWorkspaceTrusted className="text-gray-700 font-bold" />,
			link: "/mission",
		}
	];

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	return (
		<div className="py-2 px-8 absolute left-0 top-0 w-full text-white flex items-center justify-between lg:shadow-md card-1 !rounded-none">
			<div>
				<img src="/Logo.png" alt="logo" className="w-[65px]" />
			</div>

			<button
				className="lg:hidden flex items-center text-gray-700 focus:outline-none"
				onClick={toggleMenu}
			>
				<svg
					className="w-6 h-6"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					{isMenuOpen ? (
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					) : (
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6h16M4 12h16m-7 6h7"
						/>
					)}
				</svg>
			</button>

			<div className="hidden lg:flex gap-6">
				{items.map((item, _idx) => (
					<div key={_idx} className="flex items-center gap-2">
						<span>{item.icon}</span>
						<Link
							key={_idx}
							to={item.link}
							className="relative text-lg font-medium text-gray-700 before:absolute before:bottom-0 before:left-0 before:h-[2.3px] before:w-0 before:bg-gray-700 before:transition-all before:duration-300 hover:before:w-full"
						>
							{item.name}
						</Link>
					</div>
				))}

				<button
					disabled={loading}
					onClick={logout}
					className="cursor-pointer"
				>
					<MdOutlineLogout className="size-5 text-gray-700" />
				</button>
			</div>

			{isMenuOpen && (
				<div className="absolute top-full right-0 w-full p-3 lg:hidden card-1 !rounded-none z-20">
					<ul className="flex flex-col items-center space-y-4 py-4">
						{items.map((item, _idx) => (
							<li key={_idx} className="flex items-center gap-2">
								<span>{item.icon}</span>
								<Link
									to={item.link}
									className="relative text-lg font-medium text-gray-700 before:absolute before:bottom-0 before:left-0 before:h-[2.3px] before:w-0 before:bg-gray-700 before:transition-all before:duration-300 hover:before:w-full"
									onClick={() => setIsMenuOpen(false)}
								>
									{item.name}
								</Link>
							</li>
						))}

						<div className="flex items-center gap-2">
							<MdOutlineLogout className="size-5 text-gray-700" />
							<button
								className="relative gap-2 text-lg font-medium text-gray-700 before:absolute before:bottom-0 before:left-0 before:h-[2.3px] before:w-0 before:bg-gray-700 before:transition-all before:duration-300 hover:before:w-full cursor-pointer"
								disabled={loading}
								onClick={logout}
							>
								Logout
							</button>
						</div>
					</ul>
				</div>
			)}
		</div>
	);
};

export default AppNavbar;