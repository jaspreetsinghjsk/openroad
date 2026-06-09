import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      message:
        "Upload authorization is not wired yet. Implement Azure Blob SAS creation here after adding authentication.",
      container: process.env.AZURE_STORAGE_VIDEO_CONTAINER ?? "videos"
    },
    { status: 501 }
  );
}
