import tap_img from '../assets/tap_spawn.png';
import tap_md from '../portfolio/projects/tap.md?raw';
import agent_img from '../assets/agent_smith.png';
import as_md from '../portfolio/projects/agent_smith.md?raw';
import rag_img from '../assets/rag.png';
import rag_md from '../portfolio/projects/RAG.md?raw';
import { useNavigate } from "react-router";

export type Projects = {
  title: string;
  branch: string;
  years: number;
  duration: string;
  participants: string;
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
        participants: "Group of 3",
        preview: {
            img: tap_img,
            descr: "A multiplayer game featuring room exploration and interaction with NPCs, inspired by the graphics of Stardew Valley, built entirely in RUST",
        },
        markdown:tap_md
        
    },
    "agent_smith":
    {
        title: 'Agent Smith',
        branch: "AI",
        years: 2026,
        duration: "1 Months",
        participants: "Group of 3",
        preview: {
            img: agent_img,
            descr: "An autonomous agent that solves coding problems in a sandbox using MCP tools",
        },
        markdown: as_md
    },
     "RAG":
    {
        title: 'RAG',
        branch: "AI",
        years: 2026,
        duration: "1 Months",
        participants: "Solo",
        preview: {
            img: rag_img,
            descr: "An AI that can quickly respond to a knowledge base through indexing and retrieval",
        },
        markdown:rag_md
    },
}

export default function Projects() {

    
    const navigate = useNavigate();

    return (
        <div className="">
            {Object.entries(projects).map(([key, project], index) => (
                 <div className='p-10 m-auto max-w-600 border-t-[0.1px] grid grid-cols-10 grid-rows-1 gap-4 text-[oklch(62.8%_0_0)] cursor-pointer'
                    onClick={() => {navigate(`/projects/${key}`);}
                    }
				>
                    <div className='m-auto font-grotesk text-[70px]'>{index + 1}</div>
                    <div className=" m-auto col-span-5">
                        <h1 className='font-bebas text-6xl text-white'>{project.title}</h1>
                        <p className='font-grotesk text-[15px] mb-5'>{project.preview.descr}</p>
                        <div className="font-grotesk text-[15px] flex gap-4">
                            <span>{project.branch}</span>
                            <span>|</span>
                            <span>{project.years}</span>
                            <span>|</span>
                            <span>{project.duration}</span>
                        </div>
                    </div>
                    <div className="col-span-3 col-start-8">
                        <img src={project.preview.img} className='object-fill'/>
                    </div>
                    
                </div> ))}
                    
            </div>
    )
}