function Sidebar() {
	return (
		<aside
			className="h-full border-b border-outline-variant/60 bg-surface-lowest/65 px-4 py-5 shadow-glass backdrop-blur-glass md:border-b-0 md:border-r"
			aria-label="Project navigation"
		>
			<h3 className="text-sm font-semibold tracking-wide text-ink">Workspace</h3>
			<ul className="mt-4 grid gap-2">
				{['Overview', 'Experiments', 'Reports', 'Settings'].map((item) => (
					<li
						key={item}
						className="rounded-xl border border-outline-variant/70 bg-surface-lowest/80 px-3 py-2 text-sm text-ink shadow-sm transition hover:bg-surface-lowest"
					>
						{item}
					</li>
				))}
			</ul>
			<p className="mt-4 text-xs leading-5 text-muted">
				Placeholder menu for the main project area.
			</p>
		</aside>
	)
}

export default Sidebar
