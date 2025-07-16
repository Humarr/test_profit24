"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

export default function Navbar() {
    console.log("rendering Navbar component")
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full flex items-center justify-between px-6 py-4 shadow-md bg-white relative">
            {/* Logo */}
            <div className="text-2xl font-bold tracking-tight text-brand-purple-500 font-sans">
                <Logo/>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
                <Link href="#home" className="text-brand-slate-500 hover:text-brand-purple-500 font-medium font-sans">
                    Home
                </Link>
                <Link href="#pricing" className="text-brand-slate-500 hover:text-brand-purple-500 font-medium font-sans">
                    Pricing
                </Link>
                <Link href="#testimonials" className="text-brand-slate-500 hover:text-brand-purple-500 font-medium font-sans">
                    Testimonials
                </Link>
                <Link
                    href="/auth/login"
                    className="border border-brand-purple-500 text-brand-purple-500 bg-brand-cream hover:bg-brand-purple/10 px-4 py-2 rounded-xl font-medium font-sans"
                >
                    Login
                </Link>
                <Link
                    href="/auth/register"
                    className="bg-brand-purple-500 text-brand-white hover:bg-brand-purple-600 px-4 py-2 rounded-xl font-medium font-sans"
                >
                    Sign Up
                </Link>
            </div>

            {/* Mobile Nav Toggle */}
            <div className="md:hidden">
                <button onClick={() => setIsOpen(!isOpen)} className="text-brand-purple-500">
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-start px-6 py-4 space-y-4 md:hidden z-50">
                    <Link href="/" className="text-brand-slate-500 hover:text-brand-purple-500 font-medium font-sans">
                        Home
                    </Link>
                    <Link href="#pricing" className="text-brand-slate-500 hover:text-brand-purple-500 font-medium font-sans">
                        Pricing
                    </Link>
                    <Link href="#testimonials" className="text-brand-slate-500 hover:text-brand-purple-500 font-medium font-sans">
                        Testimonials
                    </Link>
                    <Link
                        href="/auth/login"
                        className="border border-brand-purple-500 text-brand-purple-500 bg-brand-cream hover:bg-brand-purple/10 px-4 py-2 rounded-xl font-medium font-sans w-full text-center"
                    >
                        Login
                    </Link>
                    <Link
                        href="/auth/register"
                        className="bg-brand-purple-500 text-brand-white hover:bg-brand-purple-600 px-4 py-2 rounded-xl font-medium font-sans w-full text-center"
                    >
                        Sign Up
                    </Link>
                </div>
            )}
        </nav>
    );
}
