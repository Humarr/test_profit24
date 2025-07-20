// app/layout.tsx or wherever your RootLayout lives

import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import GlobalSpinner from "@/components/GlobalSpinner";
import { ToastProvider } from "@/components/toast/ToastProvider"; // adjust path as needed

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Profit24 SCALPER",
  description: "Automated trading platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} font-sans antialiased`}>
        <ToastProvider animation="slide">
          {children}
          <GlobalSpinner />
        </ToastProvider>
      </body>
    </html>
  );
}
