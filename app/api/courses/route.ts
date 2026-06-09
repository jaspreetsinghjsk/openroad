import { NextResponse } from "next/server";
import { courses } from "@/lib/data";

export function GET() {
  return NextResponse.json({ courses });
}
