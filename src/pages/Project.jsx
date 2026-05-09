import { Outlet } from 'react-router-dom'
import Header from '../layouts/Header/Header'
import Sidebar from '../layouts/Sidebar/Sidebar'

function Project({ onBackHome }) {
	return (
		<div className="project-backdrop flex min-h-screen flex-col bg-[rgb(var(--bg))]">
			<Header onNavigateHome={onBackHome} isProjectView={true} />

			<div className="grid flex-1 md:grid-cols-[16rem_1fr]">
				<Sidebar />

				<main className="glass-texture relative border-l border-[rgba(var(--outline-variant),0.15)] bg-[rgba(var(--surface-lowest),0.2)] p-6 sm:p-8">
					<Outlet />
				</main>
			</div>
		</div>
	)
}

export default Project