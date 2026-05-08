function ExplainabilityPanel({ drivers }) {
	return (
		<section className="rounded-3xl border border-outline-variant/60 bg-surface-lowest/50 p-5 shadow-glass backdrop-blur-glass">
			<div className="mb-4">
				<h3 className="font-display text-xl font-semibold text-ink">Why did risk change?</h3>
				<p className="text-sm text-muted">Top drivers across genes and lifestyle signals.</p>
			</div>
			<div className="space-y-4">
				{drivers.map((driver) => (
					<div key={driver.id} className="space-y-2">
						<div className="flex items-center justify-between text-sm">
							<p className="font-medium text-ink">{driver.label}</p>
							<span className="text-muted">{driver.type}</span>
						</div>
						<div className="h-2 w-full overflow-hidden rounded-full bg-surface-lowest/70">
							<div
								className="h-full rounded-full bg-primary/70"
								style={{ width: `${Math.round(driver.contribution * 100)}%` }}
							/>
						</div>
						<p className="text-xs text-muted">Signal strength: {(driver.contribution * 100).toFixed(1)}%</p>
					</div>
				))}
			</div>
		</section>
	)
}

export default ExplainabilityPanel
