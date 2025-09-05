// app/api/getCa/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const contractAddress = process.env.CA || "No address";
  return NextResponse.json({ contractAddress });
}