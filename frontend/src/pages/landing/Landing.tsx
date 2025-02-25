import { Link } from "react-router-dom";
import LandingNav from "../../components/navbars/LandingNav";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import About from "../../components/landing/About";
import { IoBookSharp } from "react-icons/io5";
import { FaHandHoldingHeart } from "react-icons/fa";
import { GrGrow } from "react-icons/gr";
import Carousel from "../../components/landing/Carousel";
import Contact from "../../components/Contact";
import Billboard from "../../components/Billboard";

gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  const divRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(divRef.current,
      {
        y: 100,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.in"
      }
    );
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <div className="z-10">
        <LandingNav />
      </div>

      <div className="relative flex flex-col items-center justify-center text-center h-[500px] md:h-[600px] lg:min-h-screen py-20 px-6 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/bg.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div>
          <h1 className="relative text-4xl md:text-7xl font-extrabold text-yellow-400 drop-shadow-lg uppercase opacity-0" ref={divRef}>
            Nayepankh Foundation
          </h1>
        </div>
        <p className="relative text-xl md:text-2xl font-medium text-gray-300 mt-4 max-w-2xl">
          It's that easy to bring a Smile on Their Faces!
        </p>
        <div className="relative mt-6 flex gap-4">
          <Link to="/login" className="btn-primary !px-10 !md:px-16 text-lg flex items-center justify-center">
            Login
          </Link>
          <Link to="/signup" className="btn-secondary text-lg flex items-center justify-center">
            Become a Volunteer
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-16 px-6 md:-translate-y-[37%] lg:-translate-y-[60%]">
        <h2 className="text-3xl md:text-5xl font-bold text-yellow-400 mb-3">Our Mission</h2>
        <p className="text-lg text-gray-100 max-w-3xl text-center mb-2">
          We don't ask for much, just help us with what you can- Be it Money, Skill or Your Time.
        </p>

        <div className="flex flex-col md:flex-row gap-6 items-center justify-center w-[95%] mx-auto">
          <div className="card-1 flex flex-col items-center justify-center gap-2 p-6 w-full md:w-1/3 min-h-[200px] bg-gray-800 rounded-lg shadow-lg">
            <IoBookSharp className="text-slate-800 text-3xl" />
            <h1 className="text-xl text-center font-bold text-white">Education Access</h1>
            <p className="text-gray-900 text-center">
              Providing quality education and essential learning resources to underprivileged students in slum and rural areas.
            </p>
          </div>

          <div className="card-1 flex flex-col items-center justify-center gap-2 p-6 w-full md:w-1/3 min-h-[200px] bg-gray-800 rounded-lg shadow-lg">
            <FaHandHoldingHeart className="text-slate-800 text-3xl" />
            <h1 className="text-xl text-center font-bold text-white">Basic Necessities</h1>
            <p className="text-gray-900 text-center">
              Ensuring children receive food, clothing, and a supportive environment for learning and personal growth.
            </p>
          </div>

          <div className="card-1 flex flex-col items-center justify-center gap-2 p-6 w-full md:w-1/3 min-h-[200px] bg-gray-800 rounded-lg shadow-lg">
            <GrGrow className="text-slate-800 text-3xl" />
            <h1 className="text-xl text-center font-bold text-white">Empowerment & Opportunities</h1>
            <p className="text-gray-900 text-center">
              Offering scholarships, opening schools, and improving facilities to build confidence and create better future prospects.
            </p>
          </div>
        </div>
      </div>

      <Billboard />
      <About />
      <Carousel />
      <Contact />
    </div>
  );
};

export default Landing;