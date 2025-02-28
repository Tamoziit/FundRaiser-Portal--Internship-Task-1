import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Donation } from "../../types";
import useProcessDonation from "../../hooks/useProcessDonation";
import toast from "react-hot-toast";
import Spinner from "../../components/Spinner";
import useProcessSelfDonation from "../../hooks/useProcessSelfDonation";

const CompletePayment = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [donationData, setDonationData] = useState<Donation | null>();
  const { loading, donation } = useProcessDonation();
  const { loading: enLoading, selfDonation } = useProcessSelfDonation();

  const sessionId = queryParams.get("session_id");
  const id = queryParams.get("id");
  const name = queryParams.get("name");
  const referenceCode = queryParams.get("referenceCode");
  const amount = queryParams.get("amount");
  const type = queryParams.get("type") as "External" | "Self";

  const processDonation = async () => {
    if (id && sessionId && amount && type) {
      const body = {
        id,
        session_id: sessionId,
        amount: Number(amount),
      }
      let res;
      if (type === "External") {
        res = await donation(body);
      } else {
        res = await selfDonation(body);
      }

      setDonationData(res);
    } else {
      toast.error("Error in confirming payment. Try Once Again. Or Initiate Refund");
    }
  }

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      <div
        className="absolute inset-0 bg-[url('/collage.png')] bg-center bg-cover md:bg-contain bg-no-repeat opacity-75"
      />

      <div className="glassmorphic-2 !backdrop-blur-xl py-4 px-4 md:px-8 flex flex-col items-center justify-center gap-3 w-[90%] md:w-[55%] lg:w-[35%]">
        <div className="flex items-center justify-center w-full gap-3 mb-2">
          <img src="/homeLogo.png" alt="logo" className="size-20" />
          <h1 className="gradient-text-3 font-bold text-2xl lg:text-3xl">NayePankh Foundation</h1>
        </div>

        {donationData ? (
          <>
            <h1 className="text-xl md:text-2xl font-semibold text-center text-gray-800">🎊Donation Successful🎉</h1>

            <div className="h-[0.8px] w-full lg:w-[90%] bg-gray-800" />

            <div className="flex flex-col justify-center w-full">
              <div className="flex flex-wrap items-center w-full">
                <span className="font-semibold text-gray-800">Payment Id:&nbsp;</span>
                <span className="break-all font-medium">{donationData.payment_intent_id}</span>
              </div>

              <div className="flex flex-wrap items-center w-full">
                <span className="font-semibold text-gray-800">Volunteer Name:&nbsp;</span>
                <span className="break-words font-medium">{donationData.volunteer_name}</span>
              </div>

              <div className="flex flex-wrap items-center w-full">
                <span className="font-semibold text-gray-700">Volunteer Email:&nbsp;</span>
                <span className="break-words font-medium">{donationData.volunteer_email}</span>
              </div>

              <div className="flex flex-wrap items-center w-full">
                <span className="font-semibold text-gray-800">Reference Code:&nbsp;</span>
                <span className="break-all font-medium">{referenceCode}</span>
              </div>

              <div className="flex flex-wrap items-center w-full">
                <span className="font-semibold text-gray-700">Donor Name:&nbsp;</span>
                <span className="break-words font-medium">{donationData.donor_name}</span>
              </div>

              <div className="flex flex-wrap items-center w-full">
                <span className="font-semibold text-gray-800">Donor Email:&nbsp;</span>
                <span className="break-words font-medium">{donationData.donor_email}</span>
              </div>

              <div className="flex flex-wrap items-center w-full">
                <span className="font-semibold text-gray-800">Donor Mobile No.:&nbsp;</span>
                <span className="break-words font-medium">{donationData.donor_mobileNo}</span>
              </div>

              <div className="h-[0.8px] w-full bg-gray-800 my-3" />

              <div className="flex flex-wrap items-center w-full text-xl">
                <span className="font-semibold text-gray-800">Amount:&nbsp;</span>
                <span className="whitespace-nowrap font-bold">₹{donationData.amount}</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-xl md:text-2xl font-semibold text-center text-gray-800 z-10">Just One Step Behind! 🚀</h1>

            <div className="h-[0.8px] w-full lg:w-[90%] bg-gray-800" />

            <div className="flex flex-col justify-center w-full z-10">
              <div className="flex flex-wrap items-center w-full">
                <span className="font-semibold text-gray-800">Session Id:&nbsp;</span>
                <span className="break-all font-medium">{sessionId}</span>
              </div>

              <div className="flex flex-wrap items-center w-full z-10">
                <span className="font-semibold text-gray-800">Volunteer Name:&nbsp;</span>
                <span className="break-words font-medium">{name}</span>
              </div>

              <div className="flex flex-wrap items-center w-full z-10">
                <span className="font-semibold text-gray-800">Reference Code:&nbsp;</span>
                <span className="break-all font-medium">{referenceCode}</span>
              </div>

              <div className="h-[0.8px] w-full bg-gray-800 my-3" />

              <div className="flex flex-wrap items-center w-full text-xl z-10">
                <span className="font-semibold text-gray-800">Amount:&nbsp;</span>
                <span className="whitespace-nowrap font-bold">₹{amount}</span>
              </div>
            </div>

            <button
              className="mt-2 mb-1 btn-submit w-full lg:w-[80%] z-10"
              disabled={loading || enLoading}
              onClick={processDonation}
            >
              {loading || enLoading ? <Spinner size="small" color="secondary" /> : "Confirm Donation"}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default CompletePayment