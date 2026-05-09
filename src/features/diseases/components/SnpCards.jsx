import { IconDna } from '../../../components/Icons'

function SnpCards({ markers }) {
	return (
		<section className="space-y-4">
			<div>
				<h3 className="font-[Outfit] text-xl font-bold text-[rgb(var(--on-surface))]">
					SNP Evidence Cards
				</h3>
				<p className="mt-1 text-sm text-[rgb(var(--on-surface-variant))]">
					Genetic markers with simplified gene context and risk alleles.
				</p>
			</div>
			<div className="grid gap-4 md:grid-cols-2">
				{markers.map((marker, i) => (
					<div
						key={marker.rsId}
						className={`glass-card ui-hover-shadow group p-5 anim-fade-up anim-delay-${i + 1}`}
					>
						<div className="mb-3 flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="grid h-10 w-10 place-items-center rounded-xl bg-[rgba(var(--accent-purple),0.1)] text-lg text-[rgb(var(--accent-purple))] transition-colors group-hover:bg-[rgba(var(--accent-purple),0.15)]">
									<IconDna />
								</div>
								<div>
									<p className="font-[Outfit] text-base font-bold text-[rgb(var(--on-surface))]">
										{marker.gene}
									</p>
									<p className="text-xs text-[rgb(var(--on-surface-variant))]">
										{marker.rsId}
									</p>
								</div>
							</div>
							<div className="text-right">
								<p className="rounded-lg bg-[rgba(var(--risk-high),0.1)] px-2 py-0.5 text-xs font-bold text-[rgb(var(--risk-high))]">
									OR: {marker.oddsRatio}
								</p>
							</div>
						</div>

						<div className="mb-3 flex gap-3">
							<div className="rounded-lg bg-[rgba(var(--outline-variant),0.1)] px-3 py-1.5">
								<p className="text-[10px] uppercase tracking-wider text-[rgb(var(--on-surface-variant))]">Risk Allele</p>
								<p className="text-sm font-bold text-[rgb(var(--on-surface))]">{marker.riskAllele}</p>
							</div>
							<div className="rounded-lg bg-[rgba(var(--outline-variant),0.1)] px-3 py-1.5">
								<p className="text-[10px] uppercase tracking-wider text-[rgb(var(--on-surface-variant))]">Organ</p>
								<p className="text-sm font-bold text-[rgb(var(--on-surface))]">{marker.organ || 'Systemic'}</p>
							</div>
						</div>

						<p className="text-sm leading-relaxed text-[rgb(var(--on-surface-variant))]">
							{marker.function}
						</p>
					</div>
				))}
			</div>
		</section>
	)
}

export default SnpCards
