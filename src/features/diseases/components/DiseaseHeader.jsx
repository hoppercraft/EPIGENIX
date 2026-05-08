function DiseaseHeader({ name, description, riskScore }) {
	return (
		<div className="flex flex-wrap items-start justify-between gap-4">
			<div className="space-y-2">
				<h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
					{name}
				</h2>
				<p className="text-base leading-7 text-muted">{description}</p>
			</div>
			<div className="rounded-2xl border border-outline-variant/60 bg-surface-lowest/60 px-4 py-3 text-sm shadow-sm">
				<p className="text-xs uppercase tracking-wide text-muted">Risk score</p>
				<p className="mt-1 text-2xl font-semibold text-ink">{(riskScore * 100).toFixed(1)}%</p>
			</div>
		</div>
	)
}

export default DiseaseHeader
