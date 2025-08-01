/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Eye, EyeOff, Clock } from "lucide-react";
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
                  <Link
                    href="#"
                    className="text-brand-purple-600 underline font-bold"
                  >
                    User Agreement
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="#"
                    className="text-brand-purple-600 underline font-bold"
                  >
                    Privacy Policy
                  </Link>
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
                      // onClick={() => setShowAlert(false)}
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
      </div>
    </div>
  );
}