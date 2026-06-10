import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { courses as seedCourses, type Course } from "@/lib/data";

const dataDirectory = path.join(process.cwd(), ".local-data");
const coursesFile = path.join(dataDirectory, "courses.json");
const uploadsDirectory = path.join(process.cwd(), "public", "uploads");

type StoredCourses = {
  courses: Course[];
};

export async function getCourses() {
  const storedCourses = await readStoredCourses();
  return [...storedCourses, ...seedCourses];
}

export async function getCourse(courseId: string) {
  const courses = await getCourses();
  return courses.find((course) => course.id === courseId);
}

export async function getTrainerCourses(email: string) {
  const courses = await getCourses();
  return courses.filter((course) => course.trainer.toLowerCase() === email.toLowerCase());
}

export async function addCourse(course: Course) {
  const courses = await readStoredCourses();
  const nextCourses = [course, ...courses];
  await mkdir(dataDirectory, { recursive: true });
  await writeFile(coursesFile, JSON.stringify({ courses: nextCourses }, null, 2));
}

export async function saveUploadedVideo(file: File, courseId: string) {
  await mkdir(uploadsDirectory, { recursive: true });

  const extension = path.extname(file.name) || ".mp4";
  const filename = `${courseId}-${Date.now()}${sanitizeExtension(extension)}`;
  const destination = path.join(uploadsDirectory, filename);
  const bytes = Buffer.from(await file.arrayBuffer());

  await writeFile(destination, bytes);

  return `/uploads/${filename}`;
}

export function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

async function readStoredCourses() {
  try {
    const contents = await readFile(coursesFile, "utf8");
    const parsed = JSON.parse(contents) as StoredCourses;
    return Array.isArray(parsed.courses) ? parsed.courses : [];
  } catch (error) {
    if (isFileNotFound(error)) {
      return [];
    }

    throw error;
  }
}

function isFileNotFound(error: unknown) {
  return error instanceof Error && "code" in error && error.code === "ENOENT";
}

function sanitizeExtension(extension: string) {
  const normalized = extension.toLowerCase();
  return /^\.[a-z0-9]+$/.test(normalized) ? normalized : ".mp4";
}
