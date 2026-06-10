import Link from "next/link";
import { CourseCard } from "@/components/CourseCard";
import { Header } from "@/components/Header";
import { getCourses } from "@/lib/course-store";

export default async function Home() {
  const courses = await getCourses();

  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="heroContent">
            <p className="eyebrow">Video training platform</p>
            <h1>OpenRoad</h1>
            <p>
              A practical learning platform where trainers publish video courses and trainees build skills through structured lessons.
            </p>
            <div className="heroActions">
              <Link className="button" href="/trainee">
                Browse training
              </Link>
              <Link className="button secondaryButton" href="/trainer">
                Publish a course
              </Link>
            </div>
          </div>
          <div className="heroPanel" aria-label="OpenRoad course playback preview">
            <div className="mockPlayer">
              <div className="playButton" />
            </div>
            <div className="lessonRows">
              <span />
              <span />
              <span />
            </div>
          </div>
        </section>
        <section className="section">
          <div className="sectionHeader">
            <p className="eyebrow">Featured courses</p>
            <h2>Start learning</h2>
          </div>
          <div className="courseGrid">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
