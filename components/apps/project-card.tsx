import type { Project } from "@/types/project";
import { ProjectCardAndroid } from "./project-card-android";
import { ProjectCardOss } from "./project-card-oss";
import { ProjectCardWeb } from "./project-card-web";

interface Props {
  project: Project;
}

export function ProjectCard({ project }: Readonly<Props>) {
  switch (project.type) {
    case "android-app":
    case "ios-app":
    case "desktop-app":
      return <ProjectCardAndroid project={project} />;
    case "web-app":
      return <ProjectCardWeb project={project} />;
    case "oss-repo":
    case "library":
    case "service":
      return <ProjectCardOss project={project} />;
  }
}
