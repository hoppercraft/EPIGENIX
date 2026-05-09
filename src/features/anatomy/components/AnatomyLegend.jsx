function AnatomyLegend({ hoveredMarker, diseaseRisk }) {
	return (
		<div className="space-y-3 glass-card-sm p-4 text-sm">
			<p className="font-[Outfit] font-semibold text-[rgb(var(--on-surface))]">Legend</p>
			<p className="text-[rgb(var(--on-surface-variant))]">
				Highlighted regions indicate disease-affected anatomy.
			</p>
			<p className="flex items-center gap-2 text-[rgb(var(--on-surface-variant))]">
				<span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.5)]" />
				Risk markers — Size scales with risk
			</p>
			<p className="text-xs text-[rgb(var(--on-surface-variant))]">
				Intensity: {(diseaseRisk * 100).toFixed(1)}%
			</p>
			<div className="rounded-xl border border-[rgba(var(--outline-variant),0.2)] bg-[rgba(var(--surface),0.5)] p-3">
				{hoveredMarker ? (
					<>
						<p className="font-[Outfit] font-bold text-[rgb(var(--on-surface))]">
							{hoveredMarker.gene}
						</p>
						<p className="text-[rgb(var(--on-surface-variant))]">{hoveredMarker.rsId}</p>
						<div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-[rgba(var(--outline-variant),0.15)]">
							<div
								className="h-full rounded-full bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--accent-purple))]"
								style={{
									width: `${(hoveredMarker.contribution * 100).toFixed(0)}%`,
									transition: 'width 0.3s ease',
								}}
							/>
						</div>
						<p className="mt-1 text-xs text-[rgb(var(--on-surface-variant))]">
							Contribution: {(hoveredMarker.contribution * 100).toFixed(1)}%
						</p>
					</>
				) : (
					<p className="text-[rgb(var(--on-surface-variant))]">
						Hover a marker to inspect gene contribution.
					</p>
				)}
			</div>
		</div>
	)
}

export default AnatomyLegend
