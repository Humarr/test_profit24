import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  // variable: "--font-dm-sans",
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700", "800", "900",], // optionally specify weights used in design
  display: "swap",
});

export const metadata: Metadata = {
  title: "Profit24",
  description: "The bots trading platform for everyone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
