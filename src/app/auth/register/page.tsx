/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Eye, EyeOff, Clock, X } from "lucide-react";
import { useToast } from "@/components/toast/useToast";
import CustomSelect from "@/components/CustomSelect";
import CurrencyAmountInput from "@/components/CurrencyAmountInput";

export default function RegisterPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(300);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showAgreementModal, setShowAgreementModal] = useState(false);
  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

  const addToast = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    experience: "",
    referralId: "",
    tradingAmount: "",
    currency: "NGN",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [agreement, setAgreement] = useState(false);

  const handleOtpChange = (index: number, value: string) => {
    if (value && !/^[0-9]$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) otpInputs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if (activeStep !== 1 || timeLeft <= 0) return;
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, activeStep]);

  useEffect(() => {
    if (activeStep === 1) {
      setShowAlert(true);
    }
  }, [activeStep]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.experience ||
      !formData.tradingAmount ||
      !formData.phone
    ) {
      addToast("Please fill in all required fields.", "error");
      return;
    }

    if (formData.password.length < 6) {
      addToast("Password must be at least 6 characters long.", "error");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      addToast("Passwords do not match.", "error");
      return;
    }

    setLoading(true);

    try {
      const body = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        experience: formData.experience,
        referralId: formData.referralId,
        tradingAmount: formData.tradingAmount,
        phone: formData.phone,
      };

      const response = await fetch(`/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        addToast("Registration successful!", "success");
        localStorage.setItem("referral_code", data.user.myReferralCode);
        setActiveStep(3);
      } else {
        console.log("REGISTER_ERROR:", data.error);
        addToast("Registration failed: " + data.error, "error");
      }
    } catch (error) {
      console.log("REGISTER_ERROR:", error);
      const err = error as Error;
      addToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    setLoading(true);

    try {
      const res = await fetch(`/api/otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await res.json();
      if (res.ok) {
        addToast("OTP sent successfully!", "success");
        setShowAlert(false);
      } else {
        console.log("OTP_ERROR:", data.error);
        addToast(data.error, "error");
      }
    } catch (error) {
      console.log("OTP_ERROR:", error);
      const err = error as Error;
      addToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (timeLeft > 0) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await res.json();
      if (res.ok) {
        addToast("OTP sent successfully!", "success");
        setShowAlert(false);
      } else {
        console.log("OTP_ERROR:", data.error);
        addToast(data.error, "error");
      }
    } catch (error) {
      console.log("OTP_ERROR:", error);
      const err = error as Error;
      addToast(err.message, "error");
    } finally {
      setLoading(false);
    }
    setTimeLeft(300);
    addToast("A new OTP has been sent to your email.", "success");
  };

  async function verifyOTP() {
    setLoading(true);

    try {
      const response = await fetch(`/api/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp: otp.join("") }),
      });
      const data = await response.json();
      if (response.ok) {
        addToast("OTP verified successfully!", "success");
        setActiveStep(2);
      } else {
        console.log("OTP_ERROR:", data.error);
        addToast(data.error, "error");
      }
    } catch (error) {
      console.log("OTP_ERROR:", error);
      const err = error as Error;
      addToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="flex justify-center gap-4 mb-8">
        {["Get started", "Verify", "Complete registration"].map(
          (step, index) => (
            <button
              key={step}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeStep === index
                  ? "bg-brand-purple-500 text-white"
                  : "bg-white text-brand-slate-300 border border-brand-cream-300"
              }`}
            >
              {step}
            </button>
          )
        )}
      </div>

      <div className="bg-white rounded-xl shadow-md p-8">
        {activeStep === 0 && (
          <>
            <h2 className="text-2xl font-bold text-brand-slate-700 mb-6">
              Let's get started
            </h2>
            <div className="space-y-6">
              <div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200 font-sans bg-brand-slate-50/50 placeholder:text-brand-slate-400 text-brand-slate-700"
                />
              </div>
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="agreement"
                  className="mt-1 mr-2 text-brand-purple-500 border-brand-cream-300 rounded focus:ring-brand-purple-200 focus:ring-2 cursor-pointer"
                  checked={agreement}
                  onChange={(e) => setAgreement(e.target.checked)}
                />
                <label
                  htmlFor="agreement"
                  className="text-sm text-brand-slate-500"
                >
                  I agree to the{" "}
                  <button
                    type="button"
                    onClick={() => setShowAgreementModal(true)}
                    className="text-brand-purple-600 underline font-bold mx-1"
                  >
                    User Agreement
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    onClick={() => setShowPrivacyModal(true)}
                    className="text-brand-purple-600 underline font-bold mx-1"
                  >
                    Privacy Policy
                  </button>
                </label>
              </div>
              <button
                onClick={() => {
                  if (!formData.email && !agreement) {
                    addToast(
                      "Please enter an email address and agree to the terms.",
                      "error"
                    );
                    return;
                  }

                  if (!formData.email) {
                    addToast("Please enter an email address.", "error");
                    return;
                  }

                  if (!agreement) {
                    addToast("You must agree to the terms.", "error");
                    return;
                  }

                  setActiveStep(1);
                  handleSendOtp();
                }}
                className="w-full py-3 bg-brand-purple-500 text-white rounded-lg font-medium hover:bg-brand-purple-600 cursor-pointer"
              >
                Proceed
              </button>
              <div className="text-center text-sm text-brand-slate-400 mt-4">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-brand-purple-600 underline font-bold"
                >
                  Login
                </Link>
              </div>
            </div>
          </>
        )}

        {activeStep === 1 && (
          <>
            {showAlert && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                  <h3 className="text-lg font-bold text-brand-slate-700 mb-4">
                    Unable to Send OTP
                  </h3>
                  <p className="text-brand-slate-500 mb-4">
                    We couldn't send an OTP to confirm your email at this time due to temporary server issues. Please ensure you're using a valid email address, as an invalid email may lead to your registration being annulled during our security checks. If you're confident that your email is correct, you can proceed with the verification process.
                  </p>
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => {
                        setShowAlert(false);
                        setActiveStep(0);
                      }}
                      className="px-4 py-2 bg-white text-brand-slate-700 rounded-lg font-medium border border-brand-cream-300 hover:bg-brand-purple-50"
                    >
                      Change Email
                    </button>
                    <button
                      onClick={() => setActiveStep(2)}
                      className="px-4 py-2 bg-brand-purple-500 text-white rounded-lg font-medium hover:bg-brand-purple-600"
                    >
                      Proceed
                    </button>
                  </div>
                </div>
              </div>
            )}
            <h2 className="text-2xl font-bold text-brand-slate-700 mb-6">
              Verify email
            </h2>
            <div className="space-y-6">
              <div className="flex justify-between gap-2 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      otpInputs.current[index] = el;
                    }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl border border-brand-cream-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple-200 font-sans bg-brand-slate-50/90 placeholder:text-brand-slate-400 text-brand-slate-700"
                  />
                ))}
              </div>
              <button
                onClick={verifyOTP}
                className="w-full py-3 bg-brand-purple-500 text-white rounded-lg font-medium hover:bg-brand-purple-600 cursor-pointer"
              >
                Verify email
              </button>
              <button
                onClick={() => setActiveStep(0)}
                className="w-full py-3 bg-white text-brand-slate-700 rounded-lg font-medium border border-brand-cream-300 hover:bg-brand-purple-50"
              >
                Change email
              </button>
              <div className="flex items-center justify-center gap-2 text-brand-slate-500">
                <Clock className="w-4 h-4" />
                <span>{formatTime(timeLeft)}</span>
              </div>
              <div className="text-center text-brand-slate-400 mt-4">
                Haven't received the code?{" "}
                <button
                  onClick={handleResendOtp}
                  disabled={timeLeft > 0}
                  className={`text-brand-purple-600 underline font-bold ${
                    timeLeft > 0
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                  }`}
                >
                  Resend new code
                </button>
              </div>
            </div>
          </>
        )}

        {activeStep === 2 && (
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-brand-slate-700 mb-6">
              Complete your registration
            </h2>
            <div className="space-y-4">
              <CustomSelect
                placeholder="Trading experience"
                value={formData.experience}
                onChange={(val) =>
                  setFormData({ ...formData, experience: val })
                }
                options={[
                  { label: "Beginner", value: "beginner" },
                  { label: "Intermediate", value: "intermediate" },
                  { label: "Advanced", value: "advanced" },
                ]}
              />
              <input
                type="text"
                value={formData.referralId}
                onChange={(e) =>
                  setFormData({ ...formData, referralId: e.target.value })
                }
                placeholder="Referral ID (optional)"
                className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200 font-sans bg-brand-slate-50/50 placeholder:text-brand-slate-400 text-brand-slate-700"
              />
              <CurrencyAmountInput
                value={formData.tradingAmount}
                onChange={(val) =>
                  setFormData({ ...formData, tradingAmount: val })
                }
                currency={formData.currency}
                onCurrencyChange={(val) =>
                  setFormData({ ...formData, currency: val })
                }
                currencies={[
                  { label: "USD", value: "USD" },
                  { label: "EUR", value: "EUR" },
                  { label: "GBP", value: "GBP" },
                  { label: "BTC", value: "BTC" },
                  { label: "Naira (₦)", value: "NGN" },
                ]}
              />
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200 font-sans bg-brand-slate-50/50 placeholder:text-brand-slate-400 text-brand-slate-700"
              />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200 font-sans bg-brand-slate-50/50 placeholder:text-brand-slate-400 text-brand-slate-700"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200 font-sans bg-brand-slate-50/50 placeholder:text-brand-slate-400 text-brand-slate-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brand-slate-400"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 rounded-lg border border-brand-cream-300 focus:outline-none focus:ring-2 focus:ring-brand-purple-200 font-sans bg-brand-slate-50/50 placeholder:text-brand-slate-400 text-brand-slate-700"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brand-slate-400"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <button
                type="submit"
                disabled={loading}
                onClick={handleSubmit}
                className="w-full py-3 bg-brand-purple-500 text-white rounded-lg font-medium hover:bg-brand-purple-600 mt-6 flex items-center justify-center"
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                ) : null}
                {loading ? "Creating..." : "Create Account"}
              </button>
              <div className="text-center text-sm mt-4 text-brand-slate-400">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-brand-purple-600 underline font-bold"
                >
                  Login
                </Link>
              </div>
            </div>
          </form>
        )}

        {activeStep === 3 && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-brand-slate-700 mb-4">
              Registration Complete
            </h2>
            <p className="text-brand-slate-500 mb-6">
              You can now log in to your account.
            </p>
            <Link
              href="/auth/login"
              className="text-brand-purple-600 font-bold underline"
            >
              Go to Login
            </Link>
          </div>
        )}

        {/* Privacy Policy Modal */}
        {showPrivacyModal && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowPrivacyModal(false)}
          >
            <div
              className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[80vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-brand-slate-700 font-sans">
                  Profits24 Scalper Privacy Policy
                </h3>
                <button
                  type="button"
                  onClick={() => setShowPrivacyModal(false)}
                  className="text-brand-slate-400 hover:text-brand-purple-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="overflow-y-auto scrollbar-hide flex-grow text-brand-slate-500">
                <p className="mb-4">
                  Effective Date: July 30, 2025
                </p>
                <p className="mb-4">
                  Profits24 Scalper, an AI-driven trading platform, is committed to protecting your privacy. This Privacy Policy explains how Profits24 Scalper ("we," "us," or "our") collects, uses, discloses, and safeguards your information when you use our website, mobile application, or services (collectively, the "Services").
                </p>
                <h4 className="text-md font-bold font-sans mb-2">1. Information We Collect</h4>
                <p className="mb-4">
                  We collect the following types of information:
                </p>
                <ul className="list-disc pl-5 mb-4">
                  <li><strong>Personal Information:</strong> Name, email address, phone number, and other details provided during registration or account updates.</li>
                  <li><strong>Financial Information:</strong> Trading preferences, transaction history, and funding details (e.g., linked bank accounts or cryptocurrency wallets).</li>
                  <li><strong>Usage Data:</strong> Interactions with our platform, including trades executed, AI model preferences, and browsing behavior.</li>
                  <li><strong>Device Information:</strong> IP address, browser type, device identifiers, and operating system to optimize and secure your experience.</li>
                </ul>
                <h4 className="text-md font-bold font-sans mb-2">2. How We Use Your Information</h4>
                <p className="mb-4">
                  We use your information to:
                </p>
                <ul className="list-disc pl-5 mb-4">
                  <li>Provide and improve the Services, including executing AI-driven trades and personalizing recommendations.</li>
                  <li>Verify your identity and comply with anti-money laundering (AML) and know-your-customer (KYC) regulations.</li>
                  <li>Communicate with you about account updates, promotions, or security alerts.</li>
                  <li>Analyze usage patterns to enhance our AI algorithms and platform performance.</li>
                </ul>
                <h4 className="text-md font-bold font-sans mb-2">3. AI and Data Processing</h4>
                <p className="mb-4">
                  Profits24 Scalper uses artificial intelligence to analyze market data and user preferences to provide trading insights. Your trading data may be used to train our AI models, but personal information is anonymized to protect your privacy.
                </p>
                <h4 className="text-md font-bold font-sans mb-2">4. Data Sharing</h4>
                <p className="mb-4">
                  We may share your information with:
                </p>
                <ul className="list-disc pl-5 mb-4">
                  <li>Third-party service providers (e.g., payment processors, KYC verification services) to facilitate trading and compliance.</li>
                  <li>Regulatory authorities to comply with legal obligations.</li>
                  <li>Business partners for analytics, provided data is anonymized.</li>
                </ul>
                <p className="mb-4">
                  We do not sell your personal information to third parties.
                </p>
                <h4 className="text-md font-bold font-sans mb-2">5. Data Security</h4>
                <p className="mb-4">
                  We implement industry-standard security measures, including encryption and secure socket layer (SSL) technology, to protect your data. However, no system is completely secure, and you should use strong passwords and safeguard your account credentials.
                </p>
                <h4 className="text-md font-bold font-sans mb-2">6. Your Rights</h4>
                <p className="mb-4">
                  Depending on your jurisdiction, you may have the right to:
                </p>
                <ul className="list-disc pl-5 mb-4">
                  <li>Access, correct, or delete your personal information.</li>
                  <li>Opt out of marketing communications.</li>
                  <li>Request data portability or restrict processing.</li>
                </ul>
                <p className="mb-4">
                  To exercise these rights, contact us at privacy@profits24 scalper.ai.
                </p>
                <h4 className="text-md font-bold font-sans mb-2">7. Cookies and Tracking</h4>
                <p className="mb-4">
                  We use cookies to enhance your experience, such as remembering login details and tracking site usage. You can manage cookie preferences through your browser settings.
                </p>
                <h4 className="text-md font-bold font-sans mb-2">8. International Data Transfers</h4>
                <p className="mb-4">
                  Your data may be transferred to and processed in countries outside your jurisdiction, including the United States, where data protection laws may differ. We ensure appropriate safeguards are in place.
                </p>
                <h4 className="text-md font-bold font-sans mb-2">9. Updates to This Policy</h4>
                <p className="mb-4">
                  We may update this Privacy Policy periodically. Changes will be posted on our website, and significant updates will be communicated via email.
                </p>
                <h4 className="text-md font-bold font-sans mb-2">10. Contact Us</h4>
                <p className="mb-4">
                  For questions or concerns, contact us at:
                  <br />
                  Profits24 Scalper
                  <br />
                  Email: privacy@profits24 scalper.ai
                  <br />
                  Address: 123 AI Trade Lane, Tech City, TC 12345, USA
                </p>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setShowPrivacyModal(false)}
                  className="px-4 py-2 bg-brand-purple-500 text-white rounded-lg font-medium hover:bg-brand-purple-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* User Agreement Modal */}
        {showAgreementModal && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowAgreementModal(false)}
          >
            <div
              className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[80vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-brand-slate-700 font-sans">
                  Profits24 Scalper User Agreement
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAgreementModal(false)}
                  className="text-brand-slate-400 hover:text-brand-purple-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="overflow-y-auto scrollbar-hide flex-grow text-brand-slate-500">
                <p className="mb-4">
                  Effective Date: July 30, 2025
                </p>
                <p className="mb-4">
                  This User Agreement ("Agreement") governs your use of the Profits24 Scalper AI trading platform ("Services"). By registering or using the Services, you agree to be bound by these terms.
                </p>
                <h4 className="text-md font-bold font-sans mb-2">1. Eligibility</h4>
                <p className="mb-4">
                  You must be at least 18 years old and have the legal capacity to enter into contracts to use the Services. By registering, you represent that you meet these requirements.
                </p>
                <h4 className="text-md font-bold font-sans mb-2">2. Account Responsibilities</h4>
                <p className="mb-4">
                  You are responsible for:
                </p>
                <ul className="list-disc pl-5 mb-4">
                  <li>Maintaining the confidentiality of your account credentials.</li>
                  <li>All activities conducted under your account, whether authorized or not.</li>
                  <li>Notifying us immediately at support@profits24 scalper.ai if you suspect unauthorized access.</li>
                </ul>
                <h4 className="text-md font-bold font-sans mb-2">3. Use of Services</h4>
                <p className="mb-4">
                  You agree to:
                </p>
                <ul className="list-disc pl-5 mb-4">
                  <li>Use the Services only for lawful purposes.</li>
                  <li>Not engage in fraudulent activities, market manipulation, or any conduct that violates applicable laws or regulations.</li>
                  <li>Provide accurate information during registration and KYC verification.</li>
                </ul>
                <p className="mb-4">
                  Profits24 Scalper's AI-driven trading tools provide recommendations based on market data and user inputs. You acknowledge that these recommendations do not guarantee profits and are subject to market risks.
                </p>
                <h4 className="text-md font-bold font-sans mb-2">4. Risk Acknowledgment</h4>
                <p className="mb-4">
                  Trading involves significant financial risk. You are solely responsible for any losses incurred through the use of the Services. Profits24 Scalper does not provide financial advice, and past performance is not indicative of future results.
                </p>
                <h4 className="text-md font-bold font-sans mb-2">5. Fees and Payments</h4>
                <p className="mb-4">
                  You agree to pay all applicable fees for the Services, as outlined in our fee schedule. Fees are non-refundable unless otherwise stated. Payment disputes must be reported within 30 days.
                </p>
                <h4 className="text-md font-bold font-sans mb-2">6. Intellectual Property</h4>
                <p className="mb-4">
                  All content, AI algorithms, and technology provided by Profits24 Scalper are owned by us or our licensors. You may not copy, modify, or distribute any part of the Services without our prior written consent.
                </p>
                <h4 className="text-md font-bold font-sans mb-2">7. Termination</h4>
                <p className="mb-4">
                  We may suspend or terminate your account for:
                </p>
                <ul className="list-disc pl-5 mb-4">
                  <li>Violation of this Agreement.</li>
                  <li>Suspected fraudulent or illegal activity.</li>
                  <li>Failure to comply with KYC/AML requirements.</li>
                </ul>
                <p className="mb-4">
                  Upon termination, you must cease using the Services, and any pending trades may be canceled.
                </p>
                <h4 className="text-md font-bold font-sans mb-2">8. Dispute Resolution</h4>
                <p className="mb-4">
                  Any disputes arising from this Agreement will be governed by the laws of the State of Delaware, USA. You agree to resolve disputes through binding arbitration in Delaware, unless otherwise required by law.
                </p>
                <h4 className="text-md font-bold font-sans mb-2">9. Limitation of Liability</h4>
                <p className="mb-4">
                  To the fullest extent permitted by law, Profits24 Scalper is not liable for any indirect, incidental, or consequential damages arising from your use of the Services, including losses from trading decisions.
                </p>
                <h4 className="text-md font-bold font-sans mb-2">10. Updates to This Agreement</h4>
                <p className="mb-4">
                  We may update this Agreement periodically. Changes will be posted on our website, and continued use of the Services constitutes acceptance of the updated terms.
                </p>
                <h4 className="text-md font-bold font-sans mb-2">11. Contact Us</h4>
                <p className="mb-4">
                  For questions or concerns, contact us at:
                  <br />
                  Profits24 Scalper
                  <br />
                  Email: support@profits24 scalper.ai
                  <br />
                  Address: 123 AI Trade Lane, Tech City, TC 12345, USA
                </p>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setShowAgreementModal(false)}
                  className="px-4 py-2 bg-brand-purple-500 text-white rounded-lg font-medium hover:bg-brand-purple-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
