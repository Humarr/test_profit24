/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { FaInstagram as Instagram, FaLinkedinIn as Linkedin, FaTwitter as Twitter } from "react-icons/fa";

export default function Footer() {
  console.log("rendering Footer component");
  return (
    <footer className="bg-brand-purple-500/15 text-brand-slate-500 px-6 py-12 space-y-8">
      {/* Top Row: Logo & Links */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0 overflow-x-auto whitespace-nowrap">
        <div className="text-2xl font-bold text-brand-purple-500 min-w-fit">Profit24</div>

        <div className="flex flex-wrap gap-6 text-sm font-medium">
          <Link href="#" className="hover:text-brand-purple-500">
            Broker Recommendation
          </Link>
          <Link href="#" className="hover:text-brand-purple-500">
            Privacy
          </Link>
          <Link href="#" className="hover:text-brand-purple-500">
            Regional Restrictions
          </Link>
          <Link href="#" className="hover:text-brand-purple-500">
            FAQs
          </Link>
          <Link href="#" className="hover:text-brand-purple-500">
            About
          </Link>
          <Link href="#" className="hover:text-brand-purple-500">
            Support
          </Link>
          <Link href="#" className="flex items-center gap-2 hover:text-brand-purple-500">
            <Instagram size={16} /> Instagram
          </Link>
          <Link href="#" className="flex items-center gap-2 hover:text-brand-purple-500">
            <Linkedin size={16} /> LinkedIn
          </Link>
          <Link href="#" className="flex items-center gap-2 hover:text-brand-purple-500">
            <Twitter size={16} /> Twitter/X
          </Link>
        </div>
      </div>

      {/* Risk Disclosure */}
      <div className="text-xs space-y-6 max-w-4xl">
        <div>
          <h4 className="font-semibold text-sm text-brand-slate-500">Risk Disclosure</h4>
          <p className="mt-2">
            <strong>Forex Trading is Inherently Risky:</strong> Forex trading carries inherent risks, and investing in trading bots on Profit24 Scalper is no exception. We want to emphasize that trading in the foreign exchange market involves substantial risk and is not suitable for everyone. Before engaging in trading activities through our platform, it is essential to understand the potential risks involved.
          </p>
          <p className="mt-2">
            <strong>No Guaranteed Profit:</strong> We must stress that neither Profit24 Scalper nor the trading bots listed on our platform can guarantee profit. The past performance of a trading bot does not guarantee future results. There is a possibility of financial loss when copying these bots. Traders should be aware that the Forex market is volatile, and losses can occur.
          </p>
          <p className="mt-2">
            <strong>We Risk Our Capital:</strong> Profit24 Scalper risks its capital in these trading activities by allocating funds to master accounts for copying. We do not have access to your funds or passwords for your trading accounts. Importantly, we will never request your MT4 or MT5 passwords. Our risk-taking should not be confused with ownership or control of your account.
          </p>
          <p className="mt-2">
            <strong>Trade According to Your Risk Appetite:</strong> We want to empower our users to make informed decisions. It's crucial to trade according to your individual risk appetite and financial capacity. You should only invest funds that you can afford to lose. We strongly advise diversifying your investments and not concentrating all your capital on a single trading bot.
          </p>
          <p className="mt-2">
            <strong>Bots Can Fail, Technical Issues Can Occur:</strong> Trading bots, while designed to be efficient, can encounter failures, technical issues, lags, or errors. These factors are beyond our control, and we cannot guarantee the seamless operation of trading bots or the absence of technical hiccups.
          </p>
          <p className="mt-2">
            <strong>No Liability for Losses:</strong> Profit24 Scalper will not be held liable for any losses incurred while using our platform or copying trading bots. We are a research project facilitating access to trading opportunities but do not have control over market movements or the performance of bots.
          </p>
          <p className="mt-2">
            <strong>In Conclusion:</strong> Trading Forex and copying trading bots involves substantial risk. We urge you to exercise caution, conduct your own research, and trade responsibly. Profit24 Scalper is here to provide opportunities, but it is your responsibility to manage your own risk and financial well-being.
          </p>
        </div>

        {/* Regional Restrictions */}
        <div>
          <h4 className="font-semibold text-sm text-brand-slate-500">Regional Restriction Notice</h4>
          <p className="mt-2">
            Please be advised that Profit24 Scalper has specific regional restrictions in place due to the regulatory framework of the brokers we collaborate with. We regret to inform you that we do not accept users from the following countries, as the brokers we utilize do not have the necessary regulatory approvals in these regions:
            <strong> United States of America (USA), Iran, Japan, Haiti, and Syria.</strong>
          </p>
          <p className="mt-2">
            It is crucial to note that these restrictions are implemented to ensure compliance with regulatory requirements and to safeguard the interests of our users.
          </p>
          <p className="mt-2">
            Furthermore, we strongly recommend that users verify whether their country is accepted by the specific broker associated with the trading bot they intend to use. We exclusively offer our services to countries for which the respective brokers have obtained regulatory approval. While we have listed a few restricted countries here, there may be others not mentioned, so it is essential to confirm the broker's acceptance policy for your location before utilizing our platform.
          </p>
          <p className="mt-2">
            Your understanding and cooperation regarding these regional restrictions are greatly appreciated.
          </p>
        </div>
      </div>
    </footer>
  );
}
