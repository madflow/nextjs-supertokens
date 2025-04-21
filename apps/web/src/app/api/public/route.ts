import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    note: "Public api route",
  });
}
