import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const images = [
	"/c1.jpg",
	"/c2.jpg",
	"/c3.jpg"
];

const Carousel = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			nextSlide();
		}, 3000);
		return () => clearInterval(interval);
	}, [currentIndex]);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
	};

	return (
		<div className="relative w-full max-w-2xl mx-auto overflow-hidden mt-12">
			<div className="w-full text-center">
				<h1 className="text-[40px] lg:text-[50px] font-bold gradient-text-1">
					Think global, Act local!
				</h1>
				<p className="lg:text-lg italic text-gray-800 px-3">
					At NayePankh Foundation, we are committed to creating positive change and empowering communities.
				</p>
			</div>

			<div className="relative w-full flex items-center justify-center mt-10 px-4">
				<AnimatePresence>
					<motion.img
						key={currentIndex}
						src={images[currentIndex]}
						alt={`Slide ${currentIndex}`}
						className="w-full h-100 object-cover rounded-xl"
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -50 }}
						transition={{ duration: 0.5 }}
					/>
				</AnimatePresence>
			</div>

			<button
				onClick={prevSlide}
				className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-70 hover:opacity-100"
			>
				<AiOutlineLeft size={24} />
			</button>
			<button
				onClick={nextSlide}
				className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-70 hover:opacity-100"
			>
				<AiOutlineRight size={24} />
			</button>

			<div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
				{images.map((_, index) => (
					<button
						key={index}
						className={`w-3 h-3 rounded-full transition ${currentIndex === index ? "bg-white" : "bg-gray-400"
							}`}
						onClick={() => setCurrentIndex(index)}
					/>
				))}
			</div>
		</div>
	);
};

export default Carousel;