import { FaFacebook, FaInstagram, FaPhone, FaTwitter, FaYoutube } from "react-icons/fa"
import { IoMdMail } from "react-icons/io"

const Contact = () => {
	return (
		<div id="contact" className="mt-12 w-full flex flex-col items-center justify-center p-4 bg-slate-900">
			<div className="w-full text-center">
				<h1 className="text-[40px] lg:text-[50px] font-bold gradient-text-2">
					Get in touch
				</h1>
				<p className="lg:text-lg italic text-gray-300">
					Contact us via our Socials.
				</p>
			</div>

			<img src="/group.png" alt="group" className="w-[80%] lg:w-[50%] mt-10 rounded-md" />

			<div className="flex flex-wrap md:flex-nowrap w-full lg:w-[70%] items-center justify-center gap-4 mt-7">
				<div className="flex flex-col items-center w-full md:w-1/2">
					<a href="mailto:president@nayepankh.com" className="flex flex-col items-center text-center">
						<IoMdMail className="text-xl text-gray-400" />
						<span className="text-base hover:underline break-words px-2 text-gray-300">
							president@nayepankh.com
						</span>
					</a>
				</div>

				<div className="flex flex-col items-center w-full md:w-1/2">
					<a href="tel:+918318500748" className="flex flex-col items-center text-center">
						<FaPhone className="text-xl text-gray-400" />
						<span className="text-base hover:underline cursor-pointer break-words px-2 text-gray-300">
							+91-8318500748
						</span>
					</a>
				</div>
			</div>

			<div className="flex w-[80%] lg:w-[50%] items-center justify-center gap-5 mt-5">
				<a href="https://x.com/nayepankh" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-400 hover:text-gray-500"><FaTwitter /></a>
				<a href="https://www.facebook.com/nayepankhfoundation" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-400 hover:text-gray-500"><FaFacebook /></a>
				<a href="https://www.instagram.com/nayepankhfoundation" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-400 hover:text-gray-500"><FaInstagram /></a>
				<a href="https://www.youtube.com/@nayepankhfoundation" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-400 hover:text-gray-500"><FaYoutube /></a>
			</div>
		</div>
	)
}

export default Contact