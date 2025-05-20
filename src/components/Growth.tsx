'use client';
import { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

// Define a type for one month’s data
type MonthData = {
    month: string;
    value: number;
};

// Define a type for the yearly data mapping (year to array of months)
type GrowthData = {
    [year: number]: MonthData[];
};

// Your typed data object
const growthData: GrowthData = {
    2023: [
        { month: "Jan", value: 10 },
        { month: "Feb", value: 20 },
        { month: "Mar", value: 25 },
        { month: "Apr", value: 40 },
        { month: "May", value: 50 },
        { month: "Jun", value: 55 },
        { month: "Jul", value: 60 },
        { month: "Aug", value: 65 },
        { month: "Sep", value: 70 },
        { month: "Oct", value: 80 },
        { month: "Nov", value: 90 },
        { month: "Dec", value: 95 },
    ],
    2024: [
        { month: "Jan", value: 15 },
        { month: "Feb", value: 30 },
        { month: "Mar", value: 35 },
        { month: "Apr", value: 50 },
        { month: "May", value: 55 },
        { month: "Jun", value: 60 },
        { month: "Jul", value: 70 },
        { month: "Aug", value: 75 },
        { month: "Sep", value: 80 },
        { month: "Oct", value: 90 },
        { month: "Nov", value: 95 },
        { month: "Dec", value: 100 },
    ],
    2025: [
        { month: "Jan", value: 20 },
        { month: "Feb", value: 35 },
        { month: "Mar", value: 40 },
        { month: "Apr", value: 60 },
        { month: "May", value: 65 },
        { month: "Jun", value: 70 },
        { month: "Jul", value: 75 },
        { month: "Aug", value: 80 },
        { month: "Sep", value: 85 },
        { month: "Oct", value: 90 },
        { month: "Nov", value: 95 },
        { month: "Dec", value: 100 },
    ],
    2026: [
        { month: "Jan", value: 25 },
        { month: "Feb", value: 40 },
        { month: "Mar", value: 50 },
        { month: "Apr", value: 65 },
        { month: "May", value: 70 },
        { month: "Jun", value: 75 },
        { month: "Jul", value: 80 },
        { month: "Aug", value: 85 },
        { month: "Sep", value: 90 },
        { month: "Oct", value: 95 },
        { month: "Nov", value: 100 },
        { month: "Dec", value: 100 },
    ],
    2027: [
        { month: "Jan", value: 30 },
        { month: "Feb", value: 45 },
        { month: "Mar", value: 55 },
        { month: "Apr", value: 70 },
        { month: "May", value: 75 },
        { month: "Jun", value: 80 },
        { month: "Jul", value: 85 },
        { month: "Aug", value: 90 },
        { month: "Sep", value: 95 },
        { month: "Oct", value: 100 },
        { month: "Nov", value: 100 },
        { month: "Dec", value: 100 },
    ],
};

export default function GrowthSection() {
    const years: number[] = [2023, 2024, 2025, 2026, 2027];
    const [selectedYear, setSelectedYear] = useState<number>(2023);

    return (
        <section className="max-w-5xl mx-auto px-6 py-20">
            <h2 className="text-4xl font-extrabold font-sans text-brand-purple mb-8 flex justify-center text-center">
                Our growth over the years
            </h2>

            {/* Year buttons */}
            <div className="flex overflow-x-auto space-x-4 mb-10 px-4 scrollbar-hide justify-center">
                {years.map((year) => {
                    const isActive = year === selectedYear;
                    return (
                        <button
                            key={year}
                            onClick={() => setSelectedYear(year)}
                            className={`flex-shrink-0 px-5 py-2 rounded-md font-semibold transition-colors ${isActive
                                ? "bg-brand-purple text-white"
                                : "bg-[#d8b4fe] border border-brand-purple text-brand-purple"
                                }`}
                        >
                            {year}
                        </button>
                    );
                })}
            </div>



            {/* Chart container */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                {/* Legends */}
                <div className="flex justify-between mb-4">
                    <div className="font-semibold text-brand-purple">
                        Our growth over the years
                    </div>
                    <div className="font-semibold text-brand-purple">{selectedYear}</div>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={growthData[selectedYear]}>
                        <XAxis
                            dataKey="month"
                            tick={{ fill: "#72007f", fontWeight: "600" }}
                            tickLine={false}
                            axisLine={{ stroke: "#72007f" }}
                        />
                        <YAxis
                            domain={[0, 100]}
                            ticks={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                            tick={{ fill: "#72007f", fontWeight: "600" }}
                            tickLine={false}
                            axisLine={{ stroke: "#72007f" }}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: "#72007f", color: "#fff" }}
                            cursor={{ stroke: "#cc5500", strokeWidth: 2 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#72007f"
                            strokeWidth={3}
                            dot={{ r: 0, fill: "#72007f" }}
                            activeDot={{ r: 7 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}
