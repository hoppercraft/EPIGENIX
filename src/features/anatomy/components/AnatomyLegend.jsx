function AnatomyLegend({ hoveredMarker, diseaseRisk }) {
	return (
		<div className="space-y-3 rounded-2xl border border-outline-variant/60 bg-surface-lowest/60 p-4 text-sm shadow-sm">
			<p className="font-medium text-ink">Legend</p>
			<p className="text-muted">Highlighted regions indicate disease-affected anatomy.</p>
			<p className="text-muted">
				<span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500 align-middle" />{' '}
				Red dots = gene/SNP risk markers. Size/opacity scale with current risk.
			</p>
			<p className="text-xs text-muted">
				Disease intensity: {(diseaseRisk * 100).toFixed(1)}%
			</p>
			<div className="rounded-xl border border-outline-variant/50 bg-surface-lowest/70 p-3">
				{hoveredMarker ? (
					<>
						<p className="font-semibold text-ink">{hoveredMarker.gene}</p>
						<p className="text-muted">{hoveredMarker.rsId}</p>
						<p className="text-muted">
							Contribution: {(hoveredMarker.contribution * 100).toFixed(1)}%
						</p>
					</>
				) : (
					<p className="text-muted">Hover a marker to inspect gene contribution.</p>
				)}
			</div>
		</div>
	)
}

export default AnatomyLegend
