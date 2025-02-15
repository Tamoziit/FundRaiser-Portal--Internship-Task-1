const Mission = () => {
    const missions = [
        {
            head: "Incentivized Giving",
            para: "We encourage donations by offering exclusive rewards, recognition, and community engagement."
        },
        {
            head: "Maximized Impact",
            para: "Every donation directly fuels life-changing projects, ensuring measurable, long-lasting change."
        },
        {
            head: "Community First",
            para: "We build a thriving community of donors, changemakers, and beneficiaries working towards a better future."
        },
    ];

    return (
        <div id="mission" className="mt-8 w-full flex flex-col items-center justify-center p-4">
            <div className="w-full text-center mt-10">
                <h1 className="text-[39px] lg:text-[50px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-800 z-10">
                    Our Mission
                </h1>
                <p className="lg:text-lg italic text-gray-300 max-w-3xl mx-auto">
                    Empowering communities, one donation at a time. We believe in making giving more impactful, transparent, and rewarding.
                </p>
            </div>

            <div className="w-full max-w-5xl grid grid-cols-3 gap-3 md:gap-4 lg:gap-6 mt-6">
                <img src="/mission1.jpg" alt="Mission 1" className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" />
                <img src="/mission2.jpg" alt="Mission 2" className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" />
                <img src="/mission3.png" alt="Mission 3" className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" />
            </div>

            <div className="w-full flex flex-wrap gap-6 lg:gap-10 items-center justify-center mt-6">
                {missions.map((mission, _idx) => (
                    <div key={_idx} className="bg-black/10 backdrop-blur-lg shadow-md border-2 border-gray-200 rounded-lg flex flex-col items-center justify-center p-6 w-[280px] sm:w-[320px] lg:w-[360px] transition-transform transform hover:scale-105 hover:shadow-lg">
                        <h1 className="text-lg font-semibold mb-1 text-gray-200">{mission.head}</h1>
                        <div className="h-[3px] bg-emerald-300 w-6 rounded-lg" />
                        <p className="text-center text-sm text-gray-300 mt-2">
                            {mission.para}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Mission;
