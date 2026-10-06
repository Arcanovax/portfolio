import React, { useState } from 'react';
import  Me  from './me.tsx'
import { useNavigate } from "react-router";
import Projects from './projects.tsx';
import Timeline from "../components/timeline";
import Skills from './skills.tsx';


import Board from "./board.tsx";

export default function Portfolio() {

	const navigate = useNavigate();

	return (

		<div className="relative w-full min-h-screen overflow-hidden bg-[#16181B] text-foreground ">
			<div className="mx-5 my-35 text-white sm:mx-10 lg:mx-40 " >
				<div className=" pb-40 m-auto max-w-200">
					<Me/>
				</div>

				<Board />

				<div className="m-auto max-w-400">
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

					<Projects/>

				<Timeline />



				<div className="h-300 w-150 m-auto bg-red-900">

				</div>

			</div>

		</div>
	);
}
