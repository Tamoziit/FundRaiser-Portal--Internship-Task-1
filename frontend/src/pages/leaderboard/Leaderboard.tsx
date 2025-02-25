import { useEffect, useState } from "react";
import AppNavbar from "../../components/navbars/AppNav";
import { LeaderBoardList } from "../../types";
import useGetLeaderBoard from "../../hooks/useGetLeaderBoard";
import Spinner from "../../components/Spinner";
import toast from "react-hot-toast";
import { GrNext, GrPrevious } from "react-icons/gr";

const Leaderboard = () => {
  const [leaderBoardData, setLeaderBoardData] = useState<LeaderBoardList | null>();
  const { loading, leaderboard } = useGetLeaderBoard();
  const [page, setpage] = useState<number>(1);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
      .then(() => {
        toast.success("Reference Code copied to ClipBoard!");
      })
      .catch(err => {
        toast.error("Failed to copy Reference Code to ClipBoard")
        console.error("Failed to copy: ", err);
      });
  };

  const getLeaderBoard = async () => {
    const data = await leaderboard({ page });
    setLeaderBoardData(data);
  }

  useEffect(() => {
    getLeaderBoard();
  }, []);

  const next = async () => {
    setpage(prevPage => {
      const newPage = prevPage + 1;
      leaderboard({ page: newPage }).then(data => setLeaderBoardData(data));
      return newPage;
    });
  };

  const prev = async () => {
    setpage(prevPage => {
      const newPage = prevPage > 1 ? prevPage - 1 : 1;
      leaderboard({ page: newPage }).then(data => setLeaderBoardData(data));
      return newPage;
    });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="z-20">
        <AppNavbar />
      </div>

      <div className="relative pt-22 flex flex-col w-full items-center justify-center pb-6">
        {loading ? (
          <div className="-mt-22 flex w-full h-screen items-center justify-center">
            <Spinner size="large" color="primary" />
          </div>
        ) : (
          <>
            <h1 className="gradient-text-2 text-4xl">Leaderboard</h1>
            <div className="mt-4 mb-6 w-[95%] h-[1.5px] bg-gray-400" />

            <div className="w-[86%] flex items-center justify-end mb-4">
              <div className="flex gap-2 items-center justify-center">
                <button className="text-lg text-gray-200 cursor-pointer" onClick={prev}><GrPrevious /></button>
                <button className="text-lg text-gray-200 cursor-pointer" onClick={next}><GrNext /></button>
              </div>
            </div>

            {leaderBoardData ? (
              <div className="w-[90%] flex items-center justify-center flex-col gap-4">
                {leaderBoardData.users.length > 0 ? (
                  leaderBoardData?.users?.map((leader, _idx) => (
                    <div key={_idx} className="flex items-center justify-between glassmorphic-3 py-4 px-4 md:px-8 w-full">
                      <div className="flex items-center gap-3">
                        <img src={leader.profilePic || "/placeholderImg.png"} alt="ProfileImg" className="size-20 rounded-full border-2 border-gray-300" />
                        <h1 className="text-xl font-semibold text-gray-200">{leader.name}</h1>
                      </div>

                      <div className="flex flex-col items-end">
                        <span className="text-lg font-semibold text-gray-200">{leader.level}</span>
                        <span className="text-base text-gray-400 font-semibold">₹{leader.raisedAmount}</span>

                        {hoveredIdx === _idx && (
                          <div className="absolute bg-gray-600 text-white text-xs px-3 py-1 mt-8 rounded-md shadow-lg animate-fade-in">
                            Click to copy Reference Code
                          </div>
                        )}

                        <span className="text-base text-gray-400 font-semibold cursor-pointer"
                          onMouseEnter={() => setHoveredIdx(_idx)}
                          onMouseLeave={() => setHoveredIdx(null)}
                          onClick={() => copyToClipboard(leader.code)}
                        >
                          {leader.code}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="w-full flex items-center justify-center">
                    <h1 className="text-lg italic text-gray-300">
                      ...No more data Available...
                    </h1>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full flex items-center justify-center">
                <h1 className="text-lg italic text-gray-300">
                  ...Leaderboard unavailable right now...
                </h1>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Leaderboard;