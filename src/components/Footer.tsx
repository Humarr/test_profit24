import Link from "next/link";
// import {
//   Instagram,
//   Linkedin,
//   Twitter,
// } from "lucide-react";
import { FaInstagram as Instagram, FaLinkedinIn as Linkedin, FaTwitter as Twitter } from "react-icons/fa";


export default function Footer() {
    return (
        <footer className="bg-[#f5e6f5] text-brand-slate px-6 py-12 space-y-8">
            {/* Top Row: Logo & Links */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0 overflow-x-auto whitespace-nowrap">
                <div className="text-2xl font-bold text-brand-purple min-w-fit">Profit24</div>

                <div className="flex flex-wrap gap-6 text-sm font-medium">
                    <Link href="#" className="hover:text-brand-purple">
                        Broker Recommendation
                    </Link>
                    <Link href="#" className="hover:text-brand-purple">
                        Privacy
                    </Link>
                    <Link href="#" className="hover:text-brand-purple">
                        Regional Restrictions
                    </Link>
                    <Link href="#" className="hover:text-brand-purple">
                        FAQs
                    </Link>
                    <Link href="#" className="hover:text-brand-purple">
                        About
                    </Link>
                    <Link href="#" className="hover:text-brand-purple">
                        Support
                    </Link>
                    <Link href="#" className="flex items-center gap-2 hover:text-brand-purple">
                        <Instagram size={16} /> Instagram
                    </Link>
                    <Link href="#" className="flex items-center gap-2 hover:text-brand-purple">
                        <Linkedin size={16} /> LinkedIn
                    </Link>
                    <Link href="#" className="flex items-center gap-2 hover:text-brand-purple">
                        <Twitter size={16} /> Twitter/X
                    </Link>
                </div>
            </div>

            {/* Risk Disclosure */}
            <div className="text-xs space-y-4">
                <div>
                    <h4 className="font-semibold text-sm">Risk Disclosure</h4>
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
                    <h4 className="font-semibold text-sm">Regional Restrictions</h4>
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
