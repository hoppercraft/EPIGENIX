import { NavLink } from 'react-router-dom'
import { diseaseOptions } from '../../features/diseases/data/diseases'
import { IconHome, IconDna, IconFlask, IconLayers } from '../../components/Icons'

const DISEASE_ICONS = {
	'type-2-diabetes': IconFlask,
	'crohns-disease': IconDna,
	'alzheimers-disease': IconLayers,
}

function Sidebar() {
	return (
		<aside className="h-full flex flex-col overflow-y-auto border-r border-[rgba(var(--outline-variant),0.15)] bg-[rgba(var(--surface),0.5)] p-4 backdrop-blur-lg">
			<div className="space-y-6">
				{/* Workspace nav */}
				<nav className="space-y-1">
					<p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[rgb(var(--on-surface-variant))]">
						Workspace
					</p>
					<NavLink
						to="/project"
						end
						className={({ isActive }) =>
							`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
								isActive
									? 'bg-[rgba(var(--primary),0.1)] text-[rgb(var(--primary))] shadow-sm shadow-[rgba(var(--primary),0.1)]'
									: 'text-[rgb(var(--on-surface-variant))] hover:bg-[rgba(var(--surface-lowest),0.5)] hover:text-[rgb(var(--on-surface))]'
							}`
						}
					>
						{({ isActive }) => (
							<>
								<span className={`text-base ${isActive ? 'text-[rgb(var(--primary))]' : 'text-[rgb(var(--on-surface-variant))]'}`}>
									<IconHome />
								</span>
								Overview
							</>
						)}
					</NavLink>
				</nav>

				{/* Divider */}
				<div className="mx-3 h-px bg-[rgba(var(--outline-variant),0.15)]" />

				{/* Disease library */}
				<nav className="space-y-1">
					<p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[rgb(var(--on-surface-variant))]">
						Disease Library
					</p>
					{diseaseOptions.map((disease) => {
						const Icon = DISEASE_ICONS[disease.slug] || IconDna
						return (
							<NavLink
								key={disease.slug}
								to={`/project/${disease.slug}`}
								className={({ isActive }) =>
									`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
										isActive
											? 'bg-[rgba(var(--primary),0.1)] text-[rgb(var(--primary))] shadow-sm shadow-[rgba(var(--primary),0.1)]'
											: 'text-[rgb(var(--on-surface-variant))] hover:bg-[rgba(var(--surface-lowest),0.5)] hover:text-[rgb(var(--on-surface))]'
									}`
								}
							>
								{({ isActive }) => (
									<>
										<span className={`text-base ${isActive ? 'text-[rgb(var(--primary))]' : 'text-[rgb(var(--on-surface-variant))]'}`}>
											<Icon />
										</span>
										{disease.name}
									</>
								)}
							</NavLink>
						)
					})}
				</nav>

				{/* Bottom branding */}
				<div className="mt-auto pt-4">
					<div className="rounded-xl border border-[rgba(var(--outline-variant),0.15)] bg-[rgba(var(--surface-lowest),0.3)] p-3">
						<p className="text-[10px] font-medium text-[rgb(var(--on-surface-variant))]">
							EpiGeniX v0.1.0
						</p>
						<p className="mt-0.5 text-[10px] text-[rgba(var(--on-surface-variant),0.6)]">
							Educational demo only
						</p>
					</div>
				</div>
			</div>
		</aside>
	)
}

export default Sidebar