import { FaTelegramPlane } from "react-icons/fa";

export default function SupportCard() {
    return (
        <section className="bg-brand-purple-500 py-16 px-6 mx-4 md:mx-auto md:px-20 rounded-lg max-w-4xl text-white text-center my-16">
            <h2 className="text-3xl font-bold font-sans mb-4">Need clarity or support?</h2>
            <p className="text-sm mb-8">
                Reach out to us via our Telegram page
            </p>
            <a
                href="https://t.me/yourtelegramhandle"
                target="_blank"
                rel="noopener noreferrer"
                className="block mx-4 md:mx-auto md:max-w-xs bg-brand-purple-200 text-brand-purple-500 hover:bg-brand-purple-100 hover:text-brand-purple-500 px-6 py-3 rounded-full font-semibold transition-colors duration-300"
            >
                <div className="inline-flex justify-center items-center">
                    <FaTelegramPlane className="mr-2 w-5 h-5" />
                    Chat with us
                </div>
            </a>
        </section>
    );
}
