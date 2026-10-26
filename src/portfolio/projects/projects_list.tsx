import tap_img from '/assets/TAP/TAP_demo_spawn.png';
import tap_md from './TAP/doc.md?raw';

import agent_img from '/assets/Agent_Smith/title.png';
import as_md from './AgentSmith/doc.md?raw';

import rag_img from '/assets/RAG/title.png';
import rag_md from './RAG/doc.md?raw';

import vibescan_img from "/assets/VibeScan/demo.png"
import vibescan_md from './VibeScan/doc.md?raw';

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

export const projects_list: Record<string, Projects> = {
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
        markdown: tap_md

    },
    "Agent_Smith":
    {
        title: 'Agent Smith',
        branch: "AI",
        years: 2026,
        duration: "1 Months",
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
        preview: {
            img: rag_img,
            descr: "An AI that can quickly respond to a knowledge base through indexing and retrieval",
        },
        markdown: rag_md
    },
	"VibeScan":
    {
        title: 'VibeScan',
        branch: "AI",
        years: 2026,
        duration: "1 week",
        preview: {
            img: vibescan_img,
            descr: "Code analyzer for detecting AI-generated code using Jev",
        },
        markdown: vibescan_md
    },
}
