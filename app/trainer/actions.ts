"use server";

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { addCourse, saveUploadedVideo, slugify } from "@/lib/course-store";
import type { Course } from "@/lib/data";

const fallbackVideoUrl = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export async function publishCourse(formData: FormData) {
  const user = await getCurrentUser();

  if (!user || user.role !== "trainer") {
    redirect("/auth?next=/trainer");
  }

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const level = String(formData.get("level") ?? "Beginner") as Course["level"];
  const lessonTitle = String(formData.get("lessonTitle") ?? "").trim() || "Introduction";
  const duration = String(formData.get("duration") ?? "").trim() || "New";
  const video = formData.get("video");

  if (!title || !description || !["Beginner", "Intermediate", "Advanced"].includes(level)) {
    redirect("/trainer?error=Course%20title,%20description,%20and%20level%20are%20required");
  }

  const courseId = `${slugify(title) || "course"}-${Date.now()}`;
  const videoUrl = isUploadedFile(video) && video.size > 0 ? await saveUploadedVideo(video, courseId) : fallbackVideoUrl;

  await addCourse({
    id: courseId,
    title,
    trainer: user.email,
    level,
    duration,
    description,
    progress: 0,
    lessons: [
      {
        id: "lesson-1",
        title: lessonTitle,
        duration,
        videoUrl
      }
    ]
  });

  redirect(`/courses/${courseId}`);
}

function isUploadedFile(value: FormDataEntryValue | null): value is File {
  return typeof value === "object" && value !== null && "arrayBuffer" in value && "size" in value;
}
