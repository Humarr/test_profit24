// components/Standout.tsx
import Image from "next/image";

export default function Standout() {
    return (
        <section className="w-full px-6 mb-20 bg-white" id="standout">
            <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
                {/* Left: Image */}
                <div className="md:w-1/2 w-full">
                    <Image
                        src="/images/laptop-trading-man.jpg"
                        alt="Man holding laptop showing trading charts"
                        width={600}
                        height={600}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right: Gradient Content */}
                <div className="md:w-1/2 w-full bg-gradient-to-br from-brand-purple-400 to-brand-purple-600 text-white p-8 flex flex-col justify-center">
                    <h3 className="text-2xl md:text-3xl font-bold mb-6 font-sans text-white">
                        What Makes Us Stand Out
                    </h3>
                    <ol className="space-y-4 text-sm md:text-lg font-sans list-decimal list-inside">
                        <li>Copy top-performing bots with zero code.</li>
                        <li>Real-time performance analytics.</li>
                        <li>Beginner-friendly setup in minutes.</li>
                        <li>24/7 automated trades — no missed opportunities.</li>
                        <li>Backed by secure cloud infrastructure.</li>
                    </ol>

                </div>
            </div>
        </section>
    );
}
