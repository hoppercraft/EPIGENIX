function SliderPanel({ sliders, sliderValues, onSliderChange }) {
	return (
		<div className="space-y-5">
			<p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[rgb(var(--on-surface-variant))]">
				Risk Factor Controls
			</p>
			<div className="space-y-5">
				{sliders.map((slider) => {
					const value = sliderValues[slider.key]
					const min = slider.min ?? 0
					const max = slider.max ?? 100
					const percentage = max > min ? ((value - min) / (max - min)) * 100 : 0
					const isProtective = slider.direction === 'protective'

					return (
						<div key={slider.key} className="glass-card-sm p-4">
							<div className="mb-2 flex items-center justify-between">
								<label
									htmlFor={slider.key}
									className="text-sm font-medium text-[rgb(var(--on-surface))]"
								>
									{slider.label}
								</label>
								<div className="flex items-center gap-2">
									<span className={`rounded-md px-2 py-0.5 text-xs font-bold ${
										isProtective
											? 'bg-[rgba(var(--risk-low),0.1)] text-[rgb(var(--risk-low))]'
											: 'bg-[rgba(var(--risk-high),0.1)] text-[rgb(var(--risk-high))]'
									}`}>
										{isProtective ? '↓ Protective' : '↑ Risk'}
									</span>
									<span className="min-w-[2.5rem] rounded-lg bg-[rgba(var(--outline-variant),0.15)] px-2 py-0.5 text-center text-xs font-semibold text-[rgb(var(--on-surface))]">
										{value}
									</span>
								</div>
							</div>
							<div className="relative">
								<input
									id={slider.key}
									type="range"
									min={slider.min}
									max={slider.max}
									step={slider.step}
									value={value}
									onChange={(event) =>
										onSliderChange(slider.key, Number(event.target.value))
									}
									className="w-full"
									style={{
										'--thumb-color': isProtective ? 'var(--risk-low)' : 'var(--risk-high)',
										background: `linear-gradient(90deg, ${
											isProtective ? 'rgb(var(--risk-low))' : 'rgb(var(--risk-high))'
										} ${percentage}%, rgba(0, 0, 0, 0.6) ${percentage}%)`,
										boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.5)',
									}}
								/>
								<div className="mt-1 flex justify-between text-[10px] text-[rgb(var(--on-surface-variant))]">
									<span>{slider.min}</span>
									<span>{slider.max}</span>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default SliderPanel
