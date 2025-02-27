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
import Billboard from "../../components/Billboard";
import Contact from "../../components/Contact";
import Banner from "../../components/Banner";

const Home = () => {
  const { authUser } = useAuthContext();
  const [userProfile, setUserProfile] = useState<AuthUser | null>();
  const { loading, profile } = useGetProfile();
  const [uploading, setUploading] = useState<boolean>(false);
  const { loading: updating, profilePic } = useUpdateProfile();
  const [hovered, setHovered] = useState(false);
  const divRef = useRef(null);

  const getProfile = async () => {
    const data = await profile();
    setUserProfile(data);
  }

  useEffect(() => {
    getProfile();
  }, []);


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
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <div className="z-20">
        <AppNavbar />
      </div>

      <div className="relative flex flex-col items-center justify-center text-center h-[500px] md:h-[600px] lg:min-h-screen py-20 px-6 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/bg.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div>
          <h1 className="relative text-4xl md:text-7xl font-extrabold text-white drop-shadow-lg uppercase opacity-0" ref={divRef} style={{ textShadow: "0px 0px 10px #3B82F6" }}>
            Nayepankh Foundation
          </h1>
        </div>
        <p className="relative text-xl md:text-2xl font-medium text-gray-300 mt-4 max-w-2xl">
          It's that easy to bring a Smile on Their Faces!
        </p>
      </div>

      <div className="flex w-[80%] lg:w-[50%] items-center justify-center -translate-y-[50%]">
        <Banner />
      </div>

      <div className="-mt-6 md:-mt-4 w-full flex flex-col items-center justify-center p-6">
        <div className="w-full flex flex-col items-center justify-center mb-6">
          <h1 className="text-[39px] lg:text-[50px] font-bold gradient-text-1 z-10">Profile</h1>
          <span className="lg:text-lg font-medium italic text-gray-700">Your Profile Details</span>
        </div>

        <div className="flex flex-col items-center justify-center w-full gap-4 lg:w-[60%] py-4 px-8 card-3">
          {loading ? <Spinner size="large" color="primary" /> : (
            <>
              <div className="flex flex-col md:flex-row items-center justify-between w-full z-10">
                <div className="flex items-center justify-center relative">
                  <img
                    src={authUser?.profilePic || "/placeholderImg.png"}
                    alt="profile_bg"
                    className="w-40 h-40 rounded-full object-cover border-2 border-gray-700"
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
                  <span className="text-xl md:text-2xl font-bold text-gray-800">{authUser?.name}</span>
                  <span className="text-base font-semibold text-gray-600">{authUser?.email}</span>
                  <span className="text-base text-gray-600">{authUser?.mobileNo}</span>
                  <span className="text-base text-gray-600">{authUser?.dob}</span>
                  <span className="text-base text-gray-600">{authUser?.gender === 'M' ? "Male" : authUser?.gender === 'F' ? "Female" : "Others"}</span>
                </div>
              </div>

              <div className="w-full h-[0.5px] bg-gray-700" />

              <div className="flex flex-col md:flex-row gap-3 items-center justify-between md:justify-evenly w-full mb-2 z-10">
                <div className="flex flex-col items-center justify-center">
                  <FaAward className="size-10 text-gray-800" />
                  <span className="text-lg font-semibold text-gray-600">{userProfile?.level}</span>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <FaMoneyBillTrendUp className="size-10 text-gray-800" />
                  <span className="text-lg font-semibold text-gray-600">{userProfile?.raisedAmount}</span>
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

                  <IoIosCodeWorking className="size-10 text-gray-800 -mt-1 md:-mt-2" />
                  <span className="text-lg font-semibold text-gray-600 cursor-pointer" onClick={copyToClipboard}>{authUser?.code}</span>
                </div>
              </div>

              <div className="w-full h-[0.5px] bg-gray-700" />

              <CTA />
            </>
          )}
        </div>
      </div>

      <div className="!mt-12 md:!mt-50 flex w-full items-center justify-center">
        <Billboard />
      </div>
      <Contact />
    </div>
  )
}

export default Home;