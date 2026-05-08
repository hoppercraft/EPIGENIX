import { NavLink } from 'react-router-dom'

function Sidebar() {
	const diseases = [
		{
			name: 'Type 2 diabetes',
			path: '/project/type-2-diabetes',
		},
		{
			name: 'Crohn’s disease',
			path: '/project/crohns-disease',
		},
		{
			name: 'Alzheimer’s disease',
			path: '/project/alzheimers-disease',
		},
	]

	return (
		<aside className="p-4">
			<nav className="space-y-2">
				<NavLink
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
					Overview
				</NavLink>

				{diseases.map((disease) => (
					<NavLink
						key={disease.path}
						to={disease.path}
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
		</aside>
	)
}

export default Sidebar