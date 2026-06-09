import { Header } from "@/components/Header";
import { courses } from "@/lib/data";

export default function TrainerDashboard() {
  return (
    <>
      <Header />
      <main className="pageShell trainerGrid">
        <section className="sectionHeader">
          <p className="eyebrow">Trainer dashboard</p>
          <h1>Publish video courses</h1>
          <p>Prepare course details, upload lessons, and track content readiness.</p>
        </section>
        <form className="uploadPanel">
          <label>
            Course title
            <input name="title" placeholder="e.g. Azure Fundamentals" />
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
            Video file
            <input name="video" type="file" accept="video/*" />
          </label>
          <button className="button" type="button">
            Request upload URL
          </button>
        </form>
        <section className="publishedList" aria-label="Published courses">
          <h2>Published courses</h2>
          {courses.map((course) => (
            <article key={course.id} className="publishedRow">
              <div>
                <h3>{course.title}</h3>
                <p>{course.lessons.length} lessons · {course.duration}</p>
              </div>
              <span>{course.level}</span>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
