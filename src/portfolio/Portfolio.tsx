import React, { useState } from 'react';
import  Me  from './me.tsx'
import { useNavigate } from "react-router";
import Projects from './projects.tsx';
import Timeline from "../components/timeline";

export default function Portfolio() {

	const navigate = useNavigate();

	return (

		<div className="relative w-full min-h-screen overflow-hidden bg-[#16181B] text-foreground ">
			<div className="mx-5 my-35 text-white sm:mx-10 lg:mx-40 " >
				<div className=" pb-40 m-auto max-w-200">
					<Me/>
				</div>

					<Projects/>

				<Timeline />
				{/* <div className="h-64 my-20">
					<h1 className='text-4xl font-[800]'>About me:</h1>
					<div className="flex flex-col gap-5 max-w-300 my-5 text-[20px] ">
						<p>
							I've been passionate about computer science since I was a child,
							I started by working on “no-code” projects using blocks,
							then became interested in Python and C. Now I'm studying at 42 School in Lyon,
							where I'm learning various programming languages and technologies.
						</p>
						<p>
							Passionate about travel and exploration, I love traveling to broaden my horizons and discover new cultures.
						</p>
					</div>
				</div>

				<div className="h-100">
					<h1 className='text-4xl font-[800] '>Skills:</h1>
					<div className='mt-10 flex flex-row '>
						<div className='w-1/2 mx-auto'>
							<div className="max-w-100 max-h-75 m-auto grid grid-cols-4 grid-rows-3 gap-2 ">
								{svgData.map((item) => (
								<div key={item.id} className="flex items-center justify-center cursor-pointer transition-colors  hover:scale-110"
									onMouseEnter={() => setHoveredName(item)}
									onMouseLeave={() => setHoveredName(null)}
								>
									{item.icon}
								</div>
								))}
							</div>
						</div>

						<div className='mx-auto w-1/2 border'>
							<h1 className='text-4xl font-[800] text-center '>{hoveredName ? hoveredName.name : "Select a case"}</h1>
							<p className=''>{hoveredName ? hoveredName.desc : ""}</p>

						</div>
					</div>
				</div> */}
				{/* <div className="pt-30 w-150 m-auto">
					<Time/>
				</div>
				<div className="h-300 w-150 m-auto bg-red-900">

				</div> */}

			</div>

		</div>
	);
}
