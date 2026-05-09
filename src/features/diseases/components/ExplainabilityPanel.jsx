function ExplainabilityPanel({ drivers }) {
	return (
		<section className="glass-card p-6">
			<div className="mb-5">
				<h3 className="font-[Outfit] text-xl font-bold text-[rgb(var(--on-surface))]">
					Why Did Risk Change?
				</h3>
				<p className="mt-1 text-sm text-[rgb(var(--on-surface-variant))]">
					Top drivers across genetic and lifestyle signals.
				</p>
			</div>
			<div className="space-y-5">
				{drivers.map((driver, i) => (
					<div key={driver.id} className={`space-y-2 anim-fade-up anim-delay-${i + 1}`}>
						<div className="flex items-center justify-between text-sm">
							<p className="font-medium text-[rgb(var(--on-surface))]">{driver.label}</p>
							<span className={`badge !py-0.5 !text-[9px] ${driver.type === 'Gene' ? 'badge-purple' : ''}`}>
								{driver.type}
							</span>
						</div>
						<div className="h-2 w-full overflow-hidden rounded-full bg-[rgba(var(--outline-variant),0.15)]">
							<div
								className="h-full rounded-full transition-all duration-700"
								style={{
									width: `${Math.round(driver.contribution * 100)}%`,
									background: driver.type === 'Gene'
										? 'linear-gradient(90deg, rgb(var(--accent-purple)), rgb(var(--accent-pink)))'
										: 'linear-gradient(90deg, rgb(var(--primary)), rgb(var(--accent-blue)))',
									boxShadow: driver.type === 'Gene'
										? '0 0 10px rgba(var(--accent-purple), 0.3)'
										: '0 0 10px rgba(var(--primary), 0.3)',
								}}
							/>
						</div>
						<p className="text-[11px] text-[rgb(var(--on-surface-variant))]">
							Signal strength: {(driver.contribution * 100).toFixed(1)}%
						</p>
					</div>
				))}
			</div>
		</section>
	)
}

export default ExplainabilityPanel
