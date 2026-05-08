import { Outlet } from 'react-router-dom'
import Header from '../layouts/Header/Header'
import Sidebar from '../layouts/Sidebar/Sidebar'

function Project({ onBackHome }) {
	return (
		<div className="project-backdrop flex min-h-screen flex-col bg-background">
			<Header onNavigateHome={onBackHome} isProjectView={true} />

			<div className="grid flex-1 md:grid-cols-[18rem_1fr]">
				<Sidebar />

				<main className="glass-texture relative border-l border-outline-variant/60 bg-surface-lowest/45 p-6 shadow-glass backdrop-blur-glass sm:p-10">
					<Outlet />
				</main>
			</div>
		</div>
	)
}

export default Project