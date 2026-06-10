import { CourseCard } from "@/components/CourseCard";
import { Header } from "@/components/Header";
import { getCourses } from "@/lib/course-store";

export default async function TraineeDashboard() {
  const courses = await getCourses();

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
