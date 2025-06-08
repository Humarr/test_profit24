// import {  Headphones, Mail, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { FaWhatsapp } from 'react-icons/fa';

export default function HelpSupportPage() {
  return (
    <div className="max-w-4xl mx-auto text-center py-12">
      
      {/* <div className="w-64 h-64 mx-auto mb-8 bg-brand-purple-100 rounded-full flex items-center justify-center"> */}
      <Image
        src="/illustrations/help.png"
        alt="Customer Support"
        width={500}
        height={500}
        className="mx-auto mb-8"
      />
        {/* <Headphones className="w-32 h-32 text-brand-purple-500" /> */}
      {/* </div> */}
      
      <h1 className="text-3xl font-bold font-sans text-brand-slate-700 mb-4">
        Need Help, Support, or Have Questions for us?
      </h1>
      {/* <p className="text-lg font-sans text-brand-slate-500 mb-8 max-w-2xl mx-auto">
        Our support team is available 24/7 to assist you with any questions or issues you may have.
      </p> */}
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          href="https://wa.me/2348123456789"
          target="_blank"
          className="bg-brand-purple-600 hover:bg-brand-purple-700 text-white rounded-full px-6 py-3 font-medium flex items-center justify-center gap-3 transition"
        >
          <FaWhatsapp className="w-5 h-5 text-brand-white" />
          Chat us on WhatsApp
        </Link>
        
        {/* <Link
          href="mailto:support@profit24.com"
          className="border border-brand-purple-600 text-brand-purple-600 hover:bg-brand-purple-50 rounded-full px-6 py-3 font-medium flex items-center justify-center gap-3 transition"
        >
          <Mail className="w-5 h-5" />
          Email Support
        </Link>
        
        <Link
          href="/dashboard/help-support/live-chat"
          className="border border-brand-purple-600 text-brand-purple-600 hover:bg-brand-purple-50 rounded-full px-6 py-3 font-medium flex items-center justify-center gap-3 transition"
        >
          <MessageCircle className="w-5 h-5" />
          Live Chat
        </Link>
      </div>
      
      <div className="mt-12 bg-white rounded-xl shadow-sm p-8 text-left max-w-3xl mx-auto">
        <h2 className="text-xl font-bold font-sans text-brand-slate-700 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            "How do I subscribe to a plan?",
            "What payment methods do you accept?",
            "How can I track my bot's performance?",
            "Is there a mobile app available?",
            "What's your refund policy?"
          ].map((question, index) => (
            <div key={index} className="border-b border-brand-cream-200 pb-4">
              <button className="flex justify-between items-center w-full text-left">
                <span className="font-medium font-sans text-brand-slate-700">{question}</span>
                <span className="text-brand-purple-600">+</span>
              </button>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  )
}