// import Image from "next/image";

// import BotCards from "@/components/BotCards";
// import Calculation from "@/components/Calculation";
import FAQSection from "@/components/Faqs";

import GrowthSection from "@/components/Growth";

import Hero from "@/components/hero";

// import Infrastructure from "@/components/Infrastructure";
import Navbar from "@/components/navbar";

import Pricing from "@/components/Pricing";

// import Standout from "@/components/Standout";
import SupportCard from "@/components/Support";

import Testimonials from "@/components/Testimonials";

import Footer from "@/components/Footer";

import InvestmentCalculator from "@/components/InvestmentCalculator";

import WhyUs from "@/components/WhyUs";

import { getCurrentUser } from "@/lib/getCurrentUser";

export default async function Home() {
  const currentUser = await getCurrentUser()
  return (
    <main className="bg-brand-white">
      <Navbar />
      
      <Hero />
      {/* <Infrastructure /> */}
      {/* <Standout /> */}
      <WhyUs />
      {/* <Pricing  /> */}
      <Pricing currentUser={currentUser} />
      <InvestmentCalculator />
      {/* <Calculation /> */}
      <GrowthSection/>
      <Testimonials/>
      <FAQSection/>
      <SupportCard/>
      <Footer />
      {/* Rest of your page like Hero, Pricing, etc. */}
    </main>
  )
}
