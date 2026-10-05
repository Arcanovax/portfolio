import { Building2, Calendar } from "lucide-react";
import { Badge } from "./ui/badge";
import tumo_img from '../assets/tumo.png';
import school42_img from '../assets/42.png';

const experiences = [
  {
    title: "TUMO",
    location: "Lyon",
	image: tumo_img,
    period: "2022 - 2023",
    description:
      "Tumo is an after-school center for digital creation for 12- to 18-year-olds, studying programming, robotics, and video games",
    technologies: ["Scratch", "JavaScript"],
  },
  {
    title: "Degree",
    location: "Édouard Branly High School",
    period: "2025",
    description:
      "Baccalaureate with a specialization in Math, Computer Science, and Advanced Math.",
    technologies: ["Python", "HTML", "CSS"],
  },
  {
    title: "42 School",
    location: "Lyon",
    period: "2025 - Present",
	image: school42_img,
    description:
      "42 is a project-based computer science school focused on autonomy, problem-solving, and peer-to-peer learning. The curriculum emphasizes independent work, collaboration, and developing strong programming and problem-solving skills. Learning various computer programming languages through independent projects, either alone or in groups.",
    technologies: ["Python", "AI", "Rust", "C", "Shell"],
  },
];

export default function Timeline() {
  return (
    <div className="mx-auto max-w-(--breakpoint-sm) px-6 py-12 md:py-20">
      <div className="relative ml-3">

        <div className="absolute top-4 bottom-0 left-0 border-l-2" />

        {experiences.map(
          ({image, location, description, period, technologies, title }, index) => (
            <div className="relative pb-22.5 pl-8 last:pb-0" key={index}>
              <div className="absolute top-3 left-px h-3 w-3 -translate-x-1/2 rounded-full border-6 border-primary bg-background ring-8 ring-background" />

              <div className="space-y-3">
                <div className="flex items-center gap-3">
					{image && (
					<div className="flex h-15 w-30 shrink-0 items-center justify-center rounded-lg border bg-background shadow-sm">
						<img
						src={image}
						alt={`${title} logo`}
						className="h-full w-full object-contain"
						/>
					</div>
					)}

					<div>
					<h3 className="font-medium text-xl tracking-[-0.01em]">
						{title}
					</h3>

					<p className="text-sm font-medium text-muted-foreground">
						{location}
					</p>


					</div>
				</div>
				  <div className="flex items-center gap-2 text-sm ">
					<Calendar className="h-4 w-4" />
					<span>{period}</span>
				</div>
                <p className="text-pretty text-muted-foreground text-sm sm:text-base">
                  {description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <Badge
                      className="rounded-full"
                      key={tech}
                      variant="secondary"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
