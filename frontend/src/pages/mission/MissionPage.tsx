import Contact from "../../components/Contact";
import AppNavbar from "../../components/navbars/AppNav";

const MissionPage = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="z-20">
          <AppNavbar />
        </div>

        <div className="relative pt-24 lg:pt-30 py-4 px-8 flex flex-col items-center justify-center w-full">
          <div className="flex flex-col gap-2 items-center justify-center w-[98%]">
            <h1 className="gradient-text-1 text-center text-3xl">Our Mission & Vision</h1>
            <div className="w-full lg:w-[90%] h-[1.5px] bg-gray-600" />

            <div className="mb-5 mt-3">
              <h2 className="font-bold text-2xl gradient-text-3">Our Mission</h2>
              <p className="lg:text-lg">
                Our mission is to uplift underprivileged students in slum and rural areas by providing quality education, essential learning resources, and fundamental necessities like food and clothing. We strive to create a supportive environment where every child has access to education, mentorship, and personal development. Through scholarships, school openings, and improved educational facilities, we aim to empower children with knowledge, confidence, and opportunities for a better future.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-2xl gradient-text-3">Our Vision</h2>
              <p className="lg:text-lg">
                We envision a society where every child, regardless of socio-economic background, has equal access to education and a dignified life. Our goal is to establish sustainable educational programs, open schools in underserved communities, and provide scholarships and basic necessities to support holistic development. By addressing both academic and fundamental needs, we aspire to break the cycle of poverty and create a future where education transforms lives and strengthens communities.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Contact />
    </>
  )
}

export default MissionPage