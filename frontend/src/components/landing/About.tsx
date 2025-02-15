const About = () => {
    const cards = [
        {
            img: "/impact.png",
            head: "Make an Impact",
            desc: "Every contribution creates change. Support causes that matter and transform lives."
        },
        {
            img: "/rewards.png",
            head: "Earn Rewards",
            desc: "Get exclusive perks, recognition, and badges for your generosity."
        },
        {
            img: "/trust.png",
            head: "Trust & Transparency",
            desc: "We ensure that your donations reach the right hands with complete accountability."
        }
    ];

    return (
        <div id="about" className="mt-8 w-full flex flex-col items-center justify-center p-4">
            <div className="w-full text-center">
                <h1 className="text-[39px] lg:text-[50px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-800 z-10">
                    Why Donate With Us?
                </h1>
                <p className="lg:text-lg italic text-gray-500">
                    Empowering Change, Rewarding Generosity.
                </p>
            </div>

            <div className="w-full flex flex-wrap gap-6 lg:gap-10 items-center justify-center mt-10">
                {cards.map((card, _idx) => (
                    <div
                        key={_idx}
                        className="bg-black/10 backdrop-blur-lg shadow-md border-2 border-gray-200 rounded-lg flex flex-col items-center justify-center p-6 w-[280px] sm:w-[320px] lg:w-[360px] transition-transform transform hover:scale-105 hover:shadow-lg"
                    >
                        <h1 className="text-lg font-semibold mb-1 text-gray-100">{card.head}</h1>
                        <div className="h-[3.3px] bg-blue-600 w-6 rounded-lg" />
                        <img
                            src={card.img}
                            alt={card.head}
                            className="w-[140px] sm:w-[180px] lg:w-[220px] mb-4 rounded-lg"
                        />
                        <p className="text-center text-sm text-gray-200">{card.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default About;
