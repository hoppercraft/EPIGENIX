import { Outlet } from 'react-router-dom'
import Header from '../layouts/Header/Header'
import Sidebar from '../layouts/Sidebar/Sidebar'

function Project({ onBackHome }) {
	return (
		<div className="project-backdrop flex h-screen flex-col bg-[rgb(var(--bg))] overflow-hidden">
			<Header onNavigateHome={onBackHome} isProjectView={true} />

			<div className="flex flex-1 overflow-hidden md:grid md:grid-cols-[16rem_1fr]">
				<Sidebar />

				<main className="glass-texture relative overflow-y-auto border-l border-[rgba(var(--outline-variant),0.15)] bg-[rgba(var(--surface-lowest),0.2)] p-6 sm:p-8">
					<Outlet />
				</main>
			</div>
		</div>
	)
}

export default Project