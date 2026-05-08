function ScenarioPanel({ baselineRisk, improvedRisk, onSaveBaseline, onSaveImproved, onExport }) {
	return (
		<section className="rounded-3xl border border-outline-variant/60 bg-surface-lowest/50 p-5 shadow-glass backdrop-blur-glass">
			<div className="mb-4">
				<h3 className="font-display text-xl font-semibold text-ink">Scenario compare</h3>
				<p className="text-sm text-muted">Save baseline vs improved lifestyle snapshots.</p>
			</div>
			<div className="grid gap-3 text-sm">
				<div className="flex items-center justify-between rounded-2xl border border-outline-variant/60 bg-surface-lowest/70 px-3 py-2">
					<span className="text-muted">Baseline risk</span>
					<span className="font-semibold text-ink">
						{baselineRisk === null ? 'Not saved' : `${(baselineRisk * 100).toFixed(1)}%`}
					</span>
				</div>
				<div className="flex items-center justify-between rounded-2xl border border-outline-variant/60 bg-surface-lowest/70 px-3 py-2">
					<span className="text-muted">Improved risk</span>
					<span className="font-semibold text-ink">
						{improvedRisk === null ? 'Not saved' : `${(improvedRisk * 100).toFixed(1)}%`}
					</span>
				</div>
			</div>
			<div className="mt-4 flex flex-wrap gap-2">
				<button
					type="button"
					onClick={onSaveBaseline}
					className="ui-hover-shadow rounded-full border border-outline-variant/70 bg-surface-lowest/70 px-4 py-2 text-xs font-semibold text-ink"
				>
					Save baseline
				</button>
				<button
					type="button"
					onClick={onSaveImproved}
					className="ui-hover-shadow rounded-full border border-outline-variant/70 bg-surface-lowest/70 px-4 py-2 text-xs font-semibold text-ink"
				>
					Save improved
				</button>
				<button
					type="button"
					onClick={onExport}
					className="ui-hover-shadow rounded-full bg-primary px-4 py-2 text-xs font-semibold text-on-primary"
				>
					Export JSON
				</button>
			</div>
		</section>
	)
}

export default ScenarioPanel
