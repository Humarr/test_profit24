// import Image from "next/image";

import BotCards from "@/components/BotCards";
import Calculation from "@/components/Calculation";
import FAQSection from "@/components/Faqs";
import GrowthSection from "@/components/Growth";
import Hero from "@/components/hero";
import Infrastructure from "@/components/Infrastructure";
import Navbar from "@/components/navbar";
import Pricing from "@/components/Pricing";
import Standout from "@/components/Standout";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="bg-brand-white ">
      <Navbar />
      <Hero />
      <Infrastructure />
      <Standout />
      <BotCards />
      <Pricing />
      <Calculation />
      <GrowthSection/>
      <Testimonials/>
      <FAQSection/>
      {/* Rest of your page like Hero, Pricing, etc. */}
    </main>
  )
}
