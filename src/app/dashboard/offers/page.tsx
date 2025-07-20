import Pricing from "@/components/Pricing";
import { getCurrentUser } from "@/lib/getCurrentUser";

export default async function OffersPage() {
  const currentUser = await getCurrentUser()
    return (
      <div>
        <h1 className="text-2xl font-bold text-brand-slate-800 mb-2">OUR OFFERS</h1>
        {/* <div className="bg-brand-cream-100 p-6 rounded-lg shadow">
          <p>Our offers content will go here.</p>
        </div> */}
        <Pricing currentUser={currentUser} external={true}/>
      </div>
    )
}