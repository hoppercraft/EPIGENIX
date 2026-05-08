import Header from '../layouts/Header/Header'
import Sidebar from '../layouts/Sidebar/Sidebar'

function Project({ onBackHome }) {
	return (
		<div className="project-backdrop flex min-h-screen flex-col bg-background">
			<Header onNavigateHome={onBackHome} isProjectView={true} />

			<div className="grid flex-1 md:grid-cols-[18rem_1fr]">
				<Sidebar />

				<main className="glass-texture relative border-l border-outline-variant/60 bg-surface-lowest/45 p-6 shadow-glass backdrop-blur-glass sm:p-10">
					<div className="relative z-10 max-w-4xl">
						<h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
							Workspace Dashboard
						</h2>
						<p className="mt-3 text-base leading-7 text-muted">
							This is the main project area. Add your real sections (experiments, reports, and
							settings) here.
						</p>

						<section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{[{
								title: 'Overview',
								body: 'Quick snapshot of what\'s happening in your workspace.',
							}, {
								title: 'Experiments',
								body: 'Create, track, and compare experiment runs.',
							}, {
								title: 'Reports',
								body: 'Review results and export insights.',
							}].map((card) => (
								<article
									key={card.title}
									className="rounded-2xl border border-outline-variant/60 bg-surface-lowest/60 p-5 shadow-sm backdrop-blur-glass"
								>
									<h3 className="text-sm font-semibold text-ink">{card.title}</h3>
									<p className="mt-2 text-sm leading-6 text-muted">{card.body}</p>
								</article>
							))}
						</section>
					</div>
				</main>
			</div>
		</div>
	)
}

export default Project
