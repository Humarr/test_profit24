// import Image from "next/image";

// import BotCards from "@/components/BotCards";
// import Calculation from "@/components/Calculation";
import FAQSection from "@/components/Faqs";
console.log("rendering FAQSection")
import GrowthSection from "@/components/Growth";
console.log("rendering GrowthSection")
import Hero from "@/components/hero";
console.log("rendering Hero")
// import Infrastructure from "@/components/Infrastructure";
import Navbar from "@/components/navbar";
console.log("rendering Navbar")
import Pricing from "@/components/Pricing";
console.log("rendering Pricing")
// import Standout from "@/components/Standout";
import SupportCard from "@/components/Support";
console.log("rendering SupportCard")
import Testimonials from "@/components/Testimonials";
console.log("rendering Testimonials")
import Footer from "@/components/Footer";
console.log("rendering Footer")
// import InvestmentCalculator from "@/components/InvestmentCalculator";
// console.log("rendering InvestmentCalculator")
import WhyUs from "@/components/WhyUs";
console.log("rendering WhyUs")

export default function Home() {
  return (
    <main className="bg-brand-white">
      <Navbar />
      
      <Hero />
      {/* <Infrastructure /> */}
      {/* <Standout /> */}
      <WhyUs />
      <Pricing />
      {/* <InvestmentCalculator /> */}
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
