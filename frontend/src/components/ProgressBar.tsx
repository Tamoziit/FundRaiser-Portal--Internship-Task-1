interface ProgressBarProps {
    raisedAmount: number;
    target: number;
}

const ProgressBar = ({
    raisedAmount,
    target,
}: ProgressBarProps) => {
    const percentage = Math.min((raisedAmount / target) * 100, 100); //progress shouldn't exceed 100%
    const radius = 50; // Radius
    const strokeWidth = 8;
    const circumference = Math.PI * radius;
    const progress = (circumference * percentage) / 100;

    return (
        <div className="flex flex-col items-center">
            <svg width="120" height="70" viewBox="0 0 120 60">
                <path
                    d="M10,50 A40,40 0 0,1 110,50"
                    fill="none"
                    stroke="#374151"
                    strokeWidth={strokeWidth}
                    opacity="0.3"
                />
                <path
                    d="M10,50 A40,40 0 0,1 110,50"
                    fill="none"
                    stroke="#EAB308"
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${progress}, ${circumference}`}
                    strokeLinecap="round"
                />
            </svg>
            <span className="-mt-0.5 text-lg font-semibold text-gray-300">
                {percentage.toFixed(2)}% Raised
            </span>
        </div>
    );
};

export default ProgressBar;