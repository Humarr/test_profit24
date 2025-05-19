"use client";
// This is a client component
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full flex items-center justify-between px-6 py-4 shadow-md bg-white relative">
            {/* Logo */}
            <div className="text-2xl font-sans text-[#72007f]">Profit24</div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
                <Link href="#home" className="text-[#36454f] hover:text-[#72007f] font-medium">
                    Home
                </Link>
                <Link href="#pricing" className="text-[#36454f] hover:text-[#72007f] font-medium">
                    Pricing
                </Link>
                <Link href="#testimonials" className="text-[#36454f] hover:text-[#72007f] font-medium">
                    Testimonials
                </Link>
                <Link
                    href="#login"
                    className="border border-[#72007f] text-[#72007f] bg-[#f5e6f5] hover:bg-[#ebd2eb] px-4 py-2 rounded-xl font-medium"
                >
                    Login
                </Link>
                <Link
                    href="#signup"
                    className="bg-[#72007f] text-white hover:bg-[#5d0068] px-4 py-2 rounded-xl font-medium"
                >
                    Sign Up
                </Link>
            </div>

            {/* Mobile Nav Toggle */}
            <div className="md:hidden">
                <button onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-start px-6 py-4 space-y-4 md:hidden z-50">
                    <Link href="#home" className="text-[#36454f] hover:text-[#72007f] font-medium">
                        Home
                    </Link>
                    <Link href="#pricing" className="text-[#36454f] hover:text-[#72007f] font-medium">
                        Pricing
                    </Link>
                    <Link href="#testimonials" className="text-[#36454f] hover:text-[#72007f] font-medium">
                        Testimonials
                    </Link>
                    <Link
                        href="#login"
                        className="border border-[#72007f] text-[#72007f] bg-[#f5e6f5] hover:bg-[#ebd2eb] px-4 py-2 rounded-xl font-medium w-full text-center"
                    >
                        Login
                    </Link>
                    <Link
                        href="#signup"
                        className="bg-[#72007f] text-white hover:bg-[#5d0068] px-4 py-2 rounded-xl font-medium w-full text-center"
                    >
                        Sign Up
                    </Link>
                </div>
            )}
        </nav>
    );
}
