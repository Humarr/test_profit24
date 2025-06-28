import { NextRequest } from "next/server";

export function extractIdFromUrl(req: NextRequest): string | null {
    const segments = req.nextUrl.pathname.split("/");
    return segments[segments.length - 1] || null;
}