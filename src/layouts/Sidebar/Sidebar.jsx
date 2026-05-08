const diseases = [
	"Type 2 Diabetes",
	"Crohn’s Disease",
	"Alzheimer’s Disease",
]

function Sidebar({ selectedDisease, onSelectDisease }) {
	return (
		<aside
			className="h-full border-b border-outline-variant/60 bg-surface-lowest/65 px-4 py-5 shadow-glass backdrop-blur-glass md:border-b-0 md:border-r"
			aria-label="Project navigation"
		>
			<div className="mb-5">
				<h3 className="text-sm font-semibold tracking-wide text-ink">
					Choose a disease
				</h3>
				<p className="mt-1 text-xs leading-5 text-ink-muted">
					Select a diseas to explore the gene it is caused by and affected body
					parts.
				</p>
			</div>

			<nav className="space-y-3">
				{diseases.map((disease) => {
					const isActive = selectedDisease === disease.id

					return (
						<button
							key={disease}
							type="button"
							onClick={() => onSelectDisease(disease)}
							className={ `ui-hover-shadow w-full rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-all duration-200 ${
								isActive
									? "border-primary bg-primary/10 text-primary shadow-sm"
									: "border-outline-variant/60 bg-white/50 text-ink hover:border-primary/50 hover:bg-white/80"
							}`}
						>
							{disease}
						</button>
					)
				})}
			</nav>
		</aside>
	)
}

export default Sidebar