function SnpCards({ markers }) {
	return (
		<section className="space-y-3">
			<div>
				<h3 className="font-display text-xl font-semibold text-ink">SNP cards</h3>
				<p className="text-sm text-muted">Evidence markers with simplified gene context.</p>
			</div>
			<div className="grid gap-3 md:grid-cols-2">
				{markers.map((marker) => (
					<div
						key={marker.rsId}
						className="rounded-2xl border border-outline-variant/60 bg-surface-lowest/50 p-4 shadow-sm"
					>
						<div className="flex items-center justify-between text-sm">
							<p className="font-semibold text-ink">{marker.gene}</p>
							<span className="text-muted">{marker.rsId}</span>
						</div>
						<p className="mt-2 text-xs text-muted">Risk allele: {marker.riskAllele}</p>
						<p className="text-xs text-muted">Odds ratio: {marker.oddsRatio}</p>
						<p className="mt-2 text-sm text-ink">{marker.function}</p>
					</div>
				))}
			</div>
		</section>
	)
}

export default SnpCards
