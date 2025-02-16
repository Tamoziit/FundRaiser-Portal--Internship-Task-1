import { useEffect, useRef, useState } from "react";
import AppNavbar from "../../components/navbars/AppNav";
import gsap from "gsap";
import { useAuthContext } from "../../context/AuthContext";
import { AuthUser } from "../../types";
import useGetProfile from "../../hooks/useGetProfile";
import { FaAward, FaPen } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { IoIosCodeWorking } from "react-icons/io";
import Spinner from "../../components/Spinner";
import handleImageUpload from "../../utils/uploadBlobToCloudinary";
import useUpdateProfile from "../../hooks/useUpdateProfile";
import CTA from "../../components/CTA";
import toast from "react-hot-toast";

const Home = () => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const { authUser } = useAuthContext();
  const [userProfile, setUserProfile] = useState<AuthUser | null>();
  const { loading, profile } = useGetProfile();
  const [uploading, setUploading] = useState<boolean>(false);
  const { loading: updating, profilePic } = useUpdateProfile();
  const [hovered, setHovered] = useState(false);

  const getProfile = async () => {
    const data = await profile();
    setUserProfile(data);
  }

  useEffect(() => {
    getProfile();
  }, []);

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

  const handleProfilePicUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploading(true);
    if (e.target.files) {
      const file = e.target.files[0];
      const uploadedUrl = await handleImageUpload(file);
      await profilePic(uploadedUrl);
    }
    setUploading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(authUser!.code)
      .then(() => {
        toast.success("Reference Code copied to ClipBoard!");
      })
      .catch(err => {
        toast.error("Failed to copy Reference Code to ClipBoard")
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div>
      <AppNavbar />

      <div className="w-full p-8 pt-24 flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center justify-center gap-1">
          <h1 className="text-4xl md:text-5xl lg:text-[60px] font-bold text-center bg-gradient-to-r from-gray-500 via-gray-800 to-gray-500 bg-clip-text text-transparent p-4 rounded-lg transform transition-all duration-300 hover:scale-105 text-shadow-metallic">
            Welcome to Nayepankh Foundation
          </h1>
          <span className="text-md md:text-xl font-semibold text-slate-500 tracking-wide leading-relaxed text-center">
            A Cause Worth Fighting For.
          </span>
        </div>

        <img
          ref={imageRef}
          src="/homeLogo.png"
          alt="Landing"
          className="w-[530px] opacity-0 -mt-4"
        />

        <div className="mt-16 w-full flex flex-col items-center justify-center">
          <div className="w-full flex flex-col items-center justify-center mb-6">
            <h1 className="text-[39px] lg:text-[50px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-800 z-10">Profile</h1>
            <span className="lg:text-lg font-medium italic text-gray-600">Your Profile Details</span>
          </div>

          <div className="flex flex-col items-center justify-center w-full gap-4 lg:w-[60%] py-4 px-8 glassmorphic-3">
            {loading ? <Spinner size="large" color="primary" /> : (
              <>
                <div className="flex flex-col md:flex-row items-center justify-between w-full">
                  <div className="flex items-center justify-center relative">
                    <img
                      src={authUser?.profilePic || "/placeholderImg.png"}
                      alt="profile_bg"
                      className="w-40 h-40 rounded-full object-cover border-2 border-gray-400"
                    />

                    <label
                      htmlFor="profile-pic-upload"
                      className="absolute bottom-2 right-2 bg-gray-700 p-2 rounded-full cursor-pointer hover:bg-gray-800 transition"
                    >
                      {uploading || updating ? <Spinner size="small" color="accent" /> : (
                        <div>
                          <FaPen className="size-5 text-white" />
                          <input
                            type="file"
                            id="profile-pic-upload"
                            className="hidden"
                            accept="image/*"
                            onChange={handleProfilePicUpload}
                          />
                        </div>
                      )}
                    </label>
                  </div>

                  <div className="flex flex-col items-center md:items-end justify-center mt-3">
                    <span className="text-xl md:text-2xl font-bold text-gray-200">{authUser?.name}</span>
                    <span className="text-base font-semibold text-gray-400">{authUser?.email}</span>
                    <span className="text-base text-gray-400">{authUser?.mobileNo}</span>
                    <span className="text-base text-gray-400">{authUser?.dob}</span>
                    <span className="text-base text-gray-400">{authUser?.gender === 'M' ? "Male" : authUser?.gender === 'F' ? "Female" : "Others"}</span>
                  </div>
                </div>

                <div className="w-full h-[0.5px] bg-gray-400" />

                <div className="flex flex-col md:flex-row gap-3 items-center justify-between md:justify-evenly w-full mb-2">
                  <div className="flex flex-col items-center justify-center">
                    <FaAward className="size-10 text-gray-300" />
                    <span className="text-lg font-semibold text-gray-400">{userProfile?.level}</span>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <FaMoneyBillTrendUp className="size-10 text-gray-300" />
                    <span className="text-lg font-semibold text-gray-400">{userProfile?.raisedAmount}</span>
                  </div>

                  <div className="flex flex-col items-center justify-center -mt-2 md:-mt-0"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                  >
                    {/* Tooltip */}
                    {hovered && (
                      <div className="absolute bg-gray-800 text-white text-xs px-3 py-1 rounded-md shadow-lg animate-fade-in">
                        Click to copy Reference Code
                      </div>
                    )}

                    <IoIosCodeWorking className="size-10 text-gray-300 -mt-1 md:-mt-2" />
                    <span className="text-lg font-semibold text-gray-400 cursor-pointer" onClick={copyToClipboard}>{authUser?.code}</span>
                  </div>
                </div>

                <div className="w-full h-[0.5px] bg-gray-400" />

                <CTA />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;