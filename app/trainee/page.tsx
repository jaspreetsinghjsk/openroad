import { CourseCard } from "@/components/CourseCard";
import { Header } from "@/components/Header";
import { courses } from "@/lib/data";

export default function TraineeDashboard() {
  return (
    <>
      <Header />
      <main className="pageShell">
        <section className="sectionHeader">
          <p className="eyebrow">Trainee dashboard</p>
          <h1>Continue learning</h1>
          <p>Pick up courses in progress and explore new training paths.</p>
        </section>
        <section className="courseGrid">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </section>
      </main>
    </>
  );
}
