import { Link } from "react-router-dom";
import LandingNav from "../../components/navbars/LandingNav";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Landing = () => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    gsap.from(imageRef.current, {
      y: 200,
      opacity: 0,
    });
    gsap.to(imageRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.in",
    })
  }, []);

  return (
    <div>
      <LandingNav />

      <div className="w-full p-8 pt-24 flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center justify-center gap-1">
          <h1 className="text-4xl md:text-5xl lg:text-[60px] font-bold text-center bg-gradient-to-r from-gray-500 via-gray-800 to-gray-500 bg-clip-text text-transparent p-4 rounded-lg transform transition-all duration-300 hover:scale-105 text-shadow-metallic">
            Welcome to Helping Hands
          </h1>
          <span className="text-md md:text-xl font-semibold text-slate-500 tracking-wide leading-relaxed text-center">
            A Cause Worth Fighting For.
          </span>
        </div>

        <img
          ref={imageRef}
          src="/Landing.png"
          alt="Landing"
          className="w-[500px] opacity-0"
        />

        <div className="flex gap-5 mt-8">
          <Link to="/login" className="btn-primary w-[130px] flex items-center justify-center py-2">Login</Link>
          <Link to="/signup" className="btn-secondary w-[130px] flex items-center justify-center py-2">Signup</Link>
        </div>
      </div>
    </div>
  )
}

export default Landing;