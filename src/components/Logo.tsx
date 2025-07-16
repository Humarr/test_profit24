// components/Logo.tsx
"use client";

import Link from "next/link";
import  LogoSvg  from "../public/logo1.svg";
// import { ReactComponent as Logo } from './logo.svg';


interface LogoProps {
  size?: number; // width in pixels; height auto-scales
  className?: string;
  href?: string; // link to homepage or custom route
  showText?: boolean; // optional text label beside logo
}

export default function Logo({
  size = 150,
  className = "",
  href = "/",
  showText = false,
}: LogoProps) {
  return (
    <Link href={href} className={`inline-flex items-center gap-2 ${className}`}>
  
    <LogoSvg size={size} />


      {showText && (
        <span className="text-xl font-semibold text-gray-800 hidden sm:inline">
          Profits24
        </span>
      )}
    </Link>
  );
}
