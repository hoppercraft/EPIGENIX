import { NavLink } from 'react-router-dom'
import { diseaseOptions } from '../../features/diseases/data/diseases'

function Sidebar() {
	const workspaceItems = ['Overview']

	return (
		<aside className="p-4">
			<div className="space-y-6">
				<nav className="space-y-2">
					<p className="px-3 text-xs font-semibold uppercase tracking-widest text-muted">
						Workspace
					</p>
					{workspaceItems.map((label) =>
						label === 'Overview' ? (
							<NavLink
								key={label}
								to="/project"
								end
								className={({ isActive }) =>
									`ui-hover-shadow block rounded-xl px-4 py-3 text-sm font-medium transition ${
										isActive
											? 'bg-surface-lowest text-ink shadow-sm'
											: 'text-muted hover:bg-surface-lowest/50 hover:text-ink'
									}`
								}
							>
								{label}
							</NavLink>
						) : (
							<button
								key={label}
								type="button"
								className="block w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-muted opacity-70"
								disabled
							>
								{label}
							</button>
						)
					)}
				</nav>

				<nav className="space-y-2">
					<p className="px-3 text-xs font-semibold uppercase tracking-widest text-muted">
						Disease library
					</p>
					{diseaseOptions.map((disease) => (
						<NavLink
							key={disease.slug}
							to={`/project/${disease.slug}`}
							className={({ isActive }) =>
								`ui-hover-shadow block rounded-xl px-4 py-3 text-sm font-medium transition ${
									isActive
										? 'bg-surface-lowest text-ink shadow-sm'
										: 'text-muted hover:bg-surface-lowest/50 hover:text-ink'
								}`
							}
						>
							{disease.name}
						</NavLink>
					))}
				</nav>
			</div>
		</aside>
	)
}

export default Sidebar