import { redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { getCurrentUser } from "@/lib/auth";
import { getTrainerCourses } from "@/lib/course-store";
import { publishCourse } from "./actions";

type TrainerDashboardProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function TrainerDashboard({ searchParams }: TrainerDashboardProps) {
  const user = await getCurrentUser();

  if (!user || user.role !== "trainer") {
    redirect("/auth?next=/trainer");
  }

  const [{ error }, courses] = await Promise.all([searchParams, getTrainerCourses(user.email)]);

  return (
    <>
      <Header />
      <main className="pageShell trainerGrid">
        <section className="sectionHeader">
          <p className="eyebrow">Trainer dashboard</p>
          <h1>Publish video courses</h1>
          <p>Signed in as {user.email}. Prepare course details, upload a lesson video, and publish it for trainees.</p>
        </section>
        {error ? <p className="errorMessage">{error}</p> : null}
        <form className="uploadPanel" action={publishCourse}>
          <label>
            Course title
            <input name="title" placeholder="e.g. Azure Fundamentals" required />
          </label>
          <label>
            Description
            <textarea
              name="description"
              placeholder="What trainees will learn in this course"
              required
              rows={5}
            />
          </label>
          <label>
            Level
            <select name="level" defaultValue="Beginner">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </label>
          <label>
            First lesson title
            <input name="lessonTitle" placeholder="e.g. Introduction" />
          </label>
          <label>
            Lesson duration
            <input name="duration" placeholder="e.g. 18m" />
          </label>
          <label>
            Video file
            <input name="video" type="file" accept="video/*" />
          </label>
          <button className="button" type="submit">
            Publish course
          </button>
        </form>
        <section className="publishedList" aria-label="Published courses">
          <h2>Your published courses</h2>
          {courses.length > 0 ? (
            courses.map((course) => (
              <article key={course.id} className="publishedRow">
                <div>
                  <h3>{course.title}</h3>
                  <p>
                    {course.lessons.length} lessons · {course.duration}
                  </p>
                </div>
                <span>{course.level}</span>
              </article>
            ))
          ) : (
            <p>No courses published yet.</p>
          )}
        </section>
      </main>
    </>
  );
}
