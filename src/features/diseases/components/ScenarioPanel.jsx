import { IconDownload } from '../../../components/Icons'

function ScenarioPanel({ baselineRisk, improvedRisk, onSaveBaseline, onSaveImproved, onExport }) {
	const delta = baselineRisk !== null && improvedRisk !== null
		? ((improvedRisk - baselineRisk) * 100).toFixed(1)
		: null

	return (
		<section className="glass-card p-6">
			<div className="mb-5">
				<h3 className="font-[Outfit] text-xl font-bold text-[rgb(var(--on-surface))]">
					Scenario Compare
				</h3>
				<p className="mt-1 text-sm text-[rgb(var(--on-surface-variant))]">
					Save baseline vs improved lifestyle snapshots.
				</p>
			</div>

			<div className="grid gap-3 text-sm">
				<div className="glass-card-sm flex items-center justify-between px-4 py-3">
					<span className="text-[rgb(var(--on-surface-variant))]">Baseline risk</span>
					<span className="font-semibold text-[rgb(var(--on-surface))]">
						{baselineRisk === null
							? <span className="text-[rgb(var(--on-surface-variant))] opacity-50">Not saved</span>
							: `${(baselineRisk * 100).toFixed(1)}%`}
					</span>
				</div>
				<div className="glass-card-sm flex items-center justify-between px-4 py-3">
					<span className="text-[rgb(var(--on-surface-variant))]">Improved risk</span>
					<span className="font-semibold text-[rgb(var(--on-surface))]">
						{improvedRisk === null
							? <span className="text-[rgb(var(--on-surface-variant))] opacity-50">Not saved</span>
							: `${(improvedRisk * 100).toFixed(1)}%`}
					</span>
				</div>

				{/* Delta indicator */}
				{delta !== null && (
					<div className="glass-card-sm flex items-center justify-between px-4 py-3">
						<span className="text-[rgb(var(--on-surface-variant))]">Change</span>
						<span className={`font-bold ${
							Number(delta) < 0
								? 'text-[rgb(var(--risk-low))]'
								: Number(delta) > 0
								? 'text-[rgb(var(--risk-high))]'
								: 'text-[rgb(var(--on-surface-variant))]'
						}`}>
							{Number(delta) > 0 ? '+' : ''}{delta}%
							{Number(delta) < 0 ? ' ↓' : Number(delta) > 0 ? ' ↑' : ''}
						</span>
					</div>
				)}
			</div>

			<div className="mt-5 flex flex-wrap gap-2">
				<button
					type="button"
					onClick={onSaveBaseline}
					className="btn-ghost !px-4 !py-2 text-xs"
				>
					Save Baseline
				</button>
				<button
					type="button"
					onClick={onSaveImproved}
					className="btn-ghost !px-4 !py-2 text-xs"
				>
					Save Improved
				</button>
				<button
					type="button"
					onClick={onExport}
					className="btn-glow !px-4 !py-2 text-xs"
				>
					<IconDownload className="text-sm" />
					Export JSON
				</button>
			</div>
		</section>
	)
}

export default ScenarioPanel
