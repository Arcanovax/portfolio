
import { useNavigate } from "react-router";
import { projects_list } from "./projects/projects_list";




export default function Projects() {
    const navigate = useNavigate();

    return (
        <div>
            {Object.entries(projects_list).map(([key, project], index) => (
                <div
                    key={key}
                    className="
                        m-auto max-w-400
                        border-t-[0.1px]
                        grid grid-cols-1 lg:grid-cols-10
                        items-center gap-6 lg:gap-4
                        p-6 lg:p-10
                        text-[oklch(62.8%_0_0)]
                        cursor-pointer
                    "
                    onClick={() => navigate(`/projects/${key}`)}
                >
                    <div className="hidden lg:block m-auto font-grotesk text-[70px]">
                        {index + 1}
                    </div>

                    <div className="min-w-0 lg:col-span-5">
                        <h1 className="font-bebas text-4xl lg:text-6xl text-white">
                            {project.title}
                        </h1>

                        <p className="font-grotesk text-[15px] mb-5">
                            {project.preview.descr}
                        </p>

                        <div className="flex font-grotesk text-[15px] flex-wrap gap-2 lg:gap-4">
                            <span>{project.branch}</span>
                            <span>|</span>
                            <span>{project.years}</span>
                            <span >|</span>
                            <span>{project.duration}</span>
                        </div>
                    </div>

                    <div className="hidden lg:inline w-full min-w-0 lg:col-span-3 lg:col-start-8">
                        <img
                            src={project.preview.img}
                            alt={project.title}
                            className="
                                block w-full h-auto
                                max-h-56 lg:max-h-64
                                object-contain
                            "
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
