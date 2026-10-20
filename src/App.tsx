import React from 'react';
import Portfolio from './portfolio/Portfolio';
import Project_page from './portfolio/projects/project_page';
import CommitsDemo from './portfolio/Commits-demo';
import { Routes, Route } from "react-router-dom";



export default function App() {
	return (
		<Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/projects/:slug" element={<Project_page />} />
			<Route path="/commits" element={<CommitsDemo />} />
        </Routes>
	);
}
