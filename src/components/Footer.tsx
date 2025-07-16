import Link from "next/link";
// import {
//   Instagram,
//   Linkedin,
//   Twitter,
// } from "lucide-react";
import { FaInstagram as Instagram, FaLinkedinIn as Linkedin, FaTwitter as Twitter } from "react-icons/fa";


export default function Footer() {
    console.log("rendering Footer component")
    return (
        <footer className="bg-brand-purple-500/15 text-brand-slate-500 px-6 py-12 space-y-8">
            {/* Top Row: Logo & Links */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0 overflow-x-auto whitespace-nowrap">
                <div className="text-2xl font-bold text-brand-purple-500 min-w-fit">Profit24</div>

                <div className="flex flex-wrap gap-6 text-sm font-medium">
                    <Link href="#" className="hover:text-brand-purple-500">
                        Broker Recommendation
                    </Link>
                    <Link href="#" className="hover:text-brand-purple-500">
                        Privacy
                    </Link>
                    <Link href="#" className="hover:text-brand-purple-500">
                        Regional Restrictions
                    </Link>
                    <Link href="#" className="hover:text-brand-purple-500">
                        FAQs
                    </Link>
                    <Link href="#" className="hover:text-brand-purple-500">
                        About
                    </Link>
                    <Link href="#" className="hover:text-brand-purple-500">
                        Support
                    </Link>
                    <Link href="#" className="flex items-center gap-2 hover:text-brand-purple-500">
                        <Instagram size={16} /> Instagram
                    </Link>
                    <Link href="#" className="flex items-center gap-2 hover:text-brand-purple-500">
                        <Linkedin size={16} /> LinkedIn
                    </Link>
                    <Link href="#" className="flex items-center gap-2 hover:text-brand-purple-500">
                        <Twitter size={16} /> Twitter/X
                    </Link>
                </div>
            </div>

            {/* Risk Disclosure */}
            <div className="text-xs space-y-4">
                <div>
                    <h4 className="font-semibold text-sm text-brand-slate-500">Risk Disclosure</h4>
                    <ol className="list-decimal list-inside space-y-2">
                        <li>
                            Trading bots do not guarantee profit and involve high risk. Past
                            performance is not indicative of future results.
                        </li>
                        <li>
                            Always perform your due diligence and understand how our bots
                            operate before investing.
                        </li>
                        <li>
                            You are solely responsible for your investment decisions and
                            outcomes.
                        </li>
                    </ol>
                </div>

                {/* Regional Restrictions */}
                <div>
                    <h4 className="font-semibold text-sm text-brand-slate-500">Regional Restrictions</h4>
                    <p>
                        Profit24 is not intended for use in jurisdictions where such use
                        would violate local laws or regulations. Please consult your legal
                        advisor to confirm eligibility in your region.
                    </p>
                </div>
            </div>
        </footer>
    );
}
