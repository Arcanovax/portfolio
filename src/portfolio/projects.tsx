import tap_img from '../assets/tap_spawn.png';
import tap_md from '../portfolio/projects/TAP/doc.md?raw';
import agent_img from '../assets/agent_smith.png';
import as_md from '../portfolio/projects/AgentSmith/doc.md?raw';
import rag_img from '../assets/rag.png';
import rag_md from '../portfolio/projects/RAG/doc.md?raw';
import { useNavigate } from "react-router";

const markdownAssets: Record<string, string> = {
    'tap_spawn.png': tap_img,
    'agent_smith.png': agent_img,
    'rag.png': rag_img,
};

function resolveMarkdownAssets(markdown: string) {
    return markdown.replace(
        /(?:\.\.\/)+assets\/([^"'()\s>]+)/g,
        (path, fileName: string) => markdownAssets[fileName] ?? path,
    );
}

export type Projects = {
  title: string;
  branch: string;
  years: number;
  duration: string;
  preview: {
    img: any
    descr: string;
  },
  markdown?: string;
};


export const projects: Record<string, Projects> = {
    "tap":
    {
        title: 'The Answer Protocol',
        branch: "TCP protocol",
        years: 2026,
        duration: "2 Months",
        preview: {
            img: tap_img,
            descr: "A multiplayer game featuring room exploration and interaction with NPCs, inspired by the graphics of Stardew Valley, built entirely in RUST",
        },
        markdown: resolveMarkdownAssets(tap_md)

    },
    "agent_smith":
    {
        title: 'Agent Smith',
        branch: "AI",
        years: 2026,
        duration: "1 Months",
        preview: {
            img: agent_img,
            descr: "An autonomous agent that solves coding problems in a sandbox using MCP tools",
        },
        markdown: resolveMarkdownAssets(as_md)
    },
     "RAG":
    {
        title: 'RAG',
        branch: "AI",
        years: 2026,
        duration: "1 Months",
        preview: {
            img: rag_img,
            descr: "An AI that can quickly respond to a knowledge base through indexing and retrieval",
        },
        markdown: resolveMarkdownAssets(rag_md)
    },
}
export default function Projects() {
    const navigate = useNavigate();

    return (
        <div>
            {Object.entries(projects).map(([key, project], index) => (
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
