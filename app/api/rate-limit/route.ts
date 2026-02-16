import { NextRequest, NextResponse } from "next/server";
import { getRateLimitStatus } from "@/lib/rate-limit";

export async function GET(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const status = await getRateLimitStatus(ip);

  return NextResponse.json(status);
}
