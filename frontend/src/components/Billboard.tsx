import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Billboard = () => {
    const titleRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            titleRef.current,
            {
                opacity: 0,
                y: 100
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.in",
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                    markers: false
                },
            }
        );
    }, []);

    return (
        <div className="md:-mt-40 px-4 flex flex-col lg:flex-row gap-6 items-center justify-center lg:w-[85%]" ref={titleRef}>
            <img src="homeLogo.png" alt="Logo" />

            <div className="flex flex-col items-center justify-center lg:items-start">
                <h1 className="text-2 text-3xl md:text-6xl text-center lg:text-left">
                    Welcome to <span className="!text-4xl md:!text-6xl text-yellow-400">NayePankh Foundation</span>
                </h1>
                <p className="mt-4 text-center lg:text-left">
                    "NayePankh Foundation" is a non governmental organisation with a strong desire to help the society and make it a better place for all, by doing everything in our power and to make our vision successful we would require your vital support. Service to mankind is the service to god. Let's revolutionise the society together!.
                </p>
                <a href="https://nayepankh.com/" target="_blank" rel="noopener noreferrer" className="btn-secondary !py-1.5 !rounded-full mt-6">
                    More About Us
                </a>
            </div>
        </div>
    )
}

export default Billboard