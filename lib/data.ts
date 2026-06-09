export type UserRole = "trainer" | "trainee";

export type Lesson = {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
};

export type Course = {
  id: string;
  title: string;
  trainer: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  description: string;
  lessons: Lesson[];
  progress?: number;
};

const demoVideoUrl = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export const courses: Course[] = [
  {
    id: "cloud-foundations",
    title: "Cloud Foundations for Product Teams",
    trainer: "Maya Chen",
    level: "Beginner",
    duration: "4h 20m",
    description:
      "Understand cloud primitives, deployment models, security boundaries, and production readiness.",
    progress: 38,
    lessons: [
      {
        id: "intro",
        title: "What cloud platforms provide",
        duration: "12m",
        videoUrl: demoVideoUrl
      },
      {
        id: "security",
        title: "Identity, network, and storage boundaries",
        duration: "22m",
        videoUrl: demoVideoUrl
      }
    ]
  },
  {
    id: "react-architecture",
    title: "React Architecture in Practice",
    trainer: "Andre Patel",
    level: "Intermediate",
    duration: "6h 05m",
    description:
      "Design maintainable React applications with routing, data loading, accessibility, and test strategy.",
    progress: 12,
    lessons: [
      {
        id: "routing",
        title: "Route shape and ownership",
        duration: "19m",
        videoUrl: demoVideoUrl
      },
      {
        id: "state",
        title: "Server state and client state",
        duration: "27m",
        videoUrl: demoVideoUrl
      }
    ]
  },
  {
    id: "platform-engineering",
    title: "Platform Engineering with Terraform",
    trainer: "Lena Ortiz",
    level: "Advanced",
    duration: "5h 45m",
    description:
      "Build repeatable cloud environments with modules, policies, observability, and release controls.",
    progress: 0,
    lessons: [
      {
        id: "modules",
        title: "Terraform module boundaries",
        duration: "31m",
        videoUrl: demoVideoUrl
      },
      {
        id: "delivery",
        title: "Safe infrastructure delivery",
        duration: "25m",
        videoUrl: demoVideoUrl
      }
    ]
  }
];

export function getCourse(courseId: string) {
  return courses.find((course) => course.id === courseId);
}
