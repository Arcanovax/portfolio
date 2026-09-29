
import { useParams, useNavigate } from "react-router";
import { projects, Projects } from '../projects';
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import "highlight.js/styles/github-dark.css";
import remarkBreaks from "remark-breaks";


export default function Project_page() {

    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    const project: Projects | null = slug ? projects[slug] : null;


    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" }); 
    }, [slug]);

    if (!project) {
        return (
        <div className="relative w-full min-h-screen overflow-hidden bg-[#16181B] text-foreground ">
            <div className="mx-5 my-35 text-white font-grotesk sm:mx-10 lg:mx-80 " >
                <div className="m-auto  max-w-200">
                    <div
                    onClick={() =>  {
                        navigate("/");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    
                    className='relative z-10 cursor-pointer'
                     >Home</div>
                     <h1 className='font-bebas text-[110px] text-white leading-[1]'>Not found</h1>
                    </div>
                </div>
            </div>
        );
    }

	return (
        <div className="relative w-full min-h-screen overflow-hidden bg-[#16181B] text-foreground ">
            <div className="mx-5 my-35 text-white font-grotesk sm:mx-10 lg:mx-80 " >
                <div className="m-auto  max-w-200">
                    <div
                    onClick={() =>  {
                        navigate("/");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    
                    className='relative z-10 cursor-pointer'
                     >Home</div>
                    <h1 className='font-bebas text-[170px] text-white leading-[0.8]'>{project.title}</h1>
                    

                    <div className=" text-[15px] flex  justify-between items-center py-7.5 ">
                        <div className='flex flex-col'>
                            <h1 className=' text-[oklch(62.8%_0_0)]'>Branch:</h1>
                            <p className='text-[22px]'>{project.branch}</p>
                        </div>
                         <div className='flex flex-col'>
                            <h1 className=' text-[oklch(62.8%_0_0)]'>Duration:</h1>
                            <p className='text-[22px]'>{project.duration}</p>
                        </div>
                         <div className='flex flex-col'>
                            <h1 className=' text-[oklch(62.8%_0_0)]'>Team:</h1>
                            <p className='text-[22px]'>{project.participants}</p>
                        </div>
                    </div>
                    {project.markdown && (
                        <article className="prose prose-invert max-w-none
                                            prose-headings:font-bebas prose-headings:font-normal prose-headings:text-[45px]
                                            prose-headings:mt-0 prose-headings:mb-0
                                            prose-p:mt-0 prose-p:mb-4
                                            prose-p:text-[15px]">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkBreaks]}
                            rehypePlugins={[rehypeRaw, rehypeHighlight]}
                        >
                            {project.markdown}
                        </ReactMarkdown>
                        </article>
                    )}
                </div>
            </div>
        </div>
    )
}