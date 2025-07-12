import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { amount, months, currency } = await req.json();

    if (!amount || !months || !currency) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Basic 5% monthly compound interest
    // const rate = 0.05
    // const finalAmount = amount * Math.pow(1 + rate, months)

    // 40% monthly compound interest
    const rate = 0.4;
    const finalAmount = amount * Math.pow(1 + rate, months);

    // Static exchange rates (mock values, update as needed)
    const exchangeRates: Record<string, number> = {
      NGN: 1,
      USD: 0.0011, // ₦1 ≈ $0.0011
      EUR: 0.001,
      GBP: 0.0009,
      BTC: 0.000000015, // ₦1 ≈ 0.000000015 BTC
    };

    const conversionRate = exchangeRates[currency];
    if (!conversionRate) {
      return NextResponse.json(
        { error: "Unsupported currency" },
        { status: 400 }
      );
    }

    const convertedAmount = finalAmount * conversionRate;

    return NextResponse.json({
      currency,
      initialAmount: amount,
      months,
      result: parseFloat(convertedAmount.toFixed(currency === "BTC" ? 8 : 2)),
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong", detail: err },
      { status: 500 }
    );
  }
}
