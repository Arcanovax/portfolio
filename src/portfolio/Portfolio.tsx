import  Me  from './me.tsx'
import Projects from './projects.tsx';
import Timeline from "../components/timeline";
import Commits from './commits.tsx';

export default function Portfolio() {

	return (

		<div className="relative w-full min-h-screen overflow-hidden bg-[#16181B] text-foreground ">
			<div className="mx-5 my-15 sm:my-20 lg:my-40 text-white sm:mx-10 lg:mx-20 " >
				<div className="pb-10 sm:pb-20 lg:pb-40  m-auto max-w-200">
					<Me/>
				</div>



				<div className="m-auto max-w-275 mb-20 sm:mb-25 lg:mb-50 ">
					<div className="flex font-grotesk flex-col gap-5 max-w-300 my-5 text-[15px] sm:text-[20px] lg:text-[25px] ">
						<p>
						I'm a computer science student at 42 Lyon.
						</p>
						<p>
						My journey began in childhood with “no-code” projects created using visual blocks,
						which sparked my desire to understand how software actually works.
						I then moved on to Python and C, which helped me build a solid foundation in logic, memory management, and low-level problem-solving.
						</p>
						<p>
						At 42, I'm learning through a program focused on projects and peer-to-peer learning, which requires a lot of independence.
						It's thanks to this school and to personal projects I've been working on alongside it that I've developed my skills in Docker, React web development,
						network programming and AI.
						</p>
						<p>
						In parallel with the program, I continue to work on personal projects to explore new technologies, especially
						those related to AI with the goal of combining a solid foundation with modern solutions.
						</p>

					</div>
				</div>

				<div className="m-auto mb-30">
					<Projects/>
				</div>
				<div className="m-auto mb-30 max-w-250">
					<Timeline />
				</div>
{/*
				<p>
							Passionate about travel and exploration, I love traveling to broaden my horizons and discover new cultures.
				</p> */}


				<div className="max-w-250 m-auto">
					<Commits />
				</div>

			</div>

		</div>
	);
}
