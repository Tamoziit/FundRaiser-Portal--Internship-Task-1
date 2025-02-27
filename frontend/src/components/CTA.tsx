import toast from "react-hot-toast";
import { FaClipboard, FaWhatsapp } from "react-icons/fa";
import { useAuthContext } from "../context/AuthContext";

const CTA = () => {
	const { authUser } = useAuthContext();
	const linkToShare = `${import.meta.env.VITE_BASE_URL}/donate/${authUser?.code}`;

	const copyToClipboard = () => {
		navigator.clipboard.writeText(linkToShare)
			.then(() => {
				toast.success("Link copied to clipboard!");
			})
			.catch(err => {
				toast.error("Failed to copy link to ClipBoard")
				console.error("Failed to copy: ", err);
			});
	};

	const shareOnWhatsApp = () => {
		const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(linkToShare)}`;
		window.open(whatsappUrl, "_blank");
	};

	return (
		<div className="flex flex-col md:flex-row w-full items-center justify-center md:justify-evenly gap-3 mb-2 mt-0.5 z-10">
			<button className="btn-primary p-2 flex flex-col items-center gap-0.5" onClick={copyToClipboard}>
				<span>Copy Donation Link to ClipBoard</span>
				<FaClipboard />
			</button>
			<button className="btn-secondary !border-2 !border-gray-700 !text-gray-700 px-2 py-1.5 flex flex-col items-center gap-0.5" onClick={shareOnWhatsApp}>
				<span>Share Donating Link over Whatsapp</span>
				<FaWhatsapp />
			</button>
		</div>
	)
}

export default CTA;