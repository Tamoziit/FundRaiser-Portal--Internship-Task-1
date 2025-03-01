import React, { useEffect, useState } from "react";

interface CircularProgressProps {
    target: number;
    amount: number;
    pic1: string;
    pic2: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
    target,
    amount,
    pic1,
    pic2,
}) => {
    const [animatedProgress, setAnimatedProgress] = useState(0);

    useEffect(() => {
        const animationInterval = setInterval(() => {
            setAnimatedProgress((prev) => {
                if (prev >= amount) {
                    clearInterval(animationInterval);
                    return amount;
                }
                return prev + 70;
            });
        }, 1);

        return () => clearInterval(animationInterval);
    }, [amount]);

    const progress = Math.min((animatedProgress / target) * 100, 100);
    const radius = 93;
    const strokeWidth = 12;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative w-[200px] h-[200px]">
            {/* SVG Circular Progress Bar */}
            <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                className="absolute top-0 left-0"
            >
                {/* Background Circle */}
                <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    stroke="#e5e7eb" // gray-200
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                {/* Progress Circle */}
                <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    stroke="#3b82f6" // blue-500
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform="rotate(90 100 100)"
                    className="transition-all duration-300"
                />
            </svg>

            {/* Image inside the circle */}
            <img
                src={progress === 100 ? pic2 : pic1}
                alt="progress"
                className="w-[168px] h-[168px] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
        </div>
    );
};

export default CircularProgress;