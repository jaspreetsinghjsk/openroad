import Link from "next/link";
import type { Course } from "@/lib/data";

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="courseCard">
      <div className="courseMedia" aria-hidden="true">
        <span>{course.level}</span>
      </div>
      <div className="courseBody">
        <p className="eyebrow">{course.trainer}</p>
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <div className="courseMeta">
          <span>{course.duration}</span>
          <span>{course.lessons.length} lessons</span>
        </div>
        {typeof course.progress === "number" ? (
          <div className="progressWrap" aria-label={`${course.progress}% complete`}>
            <span style={{ width: `${course.progress}%` }} />
          </div>
        ) : null}
        <Link className="button secondaryButton" href={`/courses/${course.id}`}>
          View course
        </Link>
      </div>
    </article>
  );
}
