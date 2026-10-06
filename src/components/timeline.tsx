import { Badge } from "./ui/badge";
import tumo_img from '../assets/tumo.png';
import school42_img from '../assets/42.png';

const experiences = [
  {
    title: "TUMO",
    location: "Lyon",
	image: tumo_img,
    period: "2023",
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
    period: "2026",
	image: school42_img,
    description:
      "42 is a project-based computer science school focused on autonomy, problem-solving, and peer-to-peer learning. The curriculum emphasizes independent work, collaboration, and developing strong programming and problem-solving skills. Learning various computer programming languages through independent projects, either alone or in groups.",
    technologies: ["Python", "AI", "Rust", "C", "Shell"],
  },
];

export default function Timeline() {
  return (
    <div className="mx-auto max-w-(--breakpoint-sm) py-12 md:py-20">
      <div className="relative ml-3">

        {experiences.map(
          ({image, location, description, period, technologies, title}, index) => (

            <div className="relative pb-35 pl-20 last:pb-0" key={index}>

				<div className="absolute right-full font-grotesk text-[30px]">
					<span>{period}</span>
				</div>


              <div className="space-y-3">
                <div className="flex items-center gap-3">
					{image && (
					<div className="flex h-15 w-30 shrink-0 items-center justify-center rounded border bg-background shadow-sm">
						<img
						src={image}
						alt={`${title} logo`}
						className="h-full w-full object-contain"
						/>
					</div>
					)}

					<div>
					<h3 className="font-medium text-2xl tracking-[-0.01em]">
						{title}
					</h3>

					<p className="text-m font-medium text-muted-foreground">
						{location}
					</p>


					</div>
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
