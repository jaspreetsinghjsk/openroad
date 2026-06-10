import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { VideoPlayer } from "@/components/VideoPlayer";
import { getCourse } from "@/lib/course-store";

type CoursePageProps = {
  params: Promise<{
    courseId: string;
  }>;
};

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseId } = await params;
  const course = await getCourse(courseId);

  if (!course) {
    notFound();
  }

  const firstLesson = course.lessons[0];

  return (
    <>
      <Header />
      <main className="courseLayout">
        <section>
          <Link className="backLink" href="/trainee">
            Back to courses
          </Link>
          <h1>{course.title}</h1>
          <p>{course.description}</p>
          <VideoPlayer title={firstLesson.title} src={firstLesson.videoUrl} />
        </section>
        <aside className="lessonList">
          <p className="eyebrow">Course content</p>
          <h2>{course.lessons.length} lessons</h2>
          {course.lessons.map((lesson, index) => (
            <button key={lesson.id} className="lessonButton" type="button">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{lesson.title}</strong>
              <small>{lesson.duration}</small>
            </button>
          ))}
        </aside>
      </main>
    </>
  );
}
