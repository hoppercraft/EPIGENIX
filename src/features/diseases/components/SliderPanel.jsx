function SliderPanel({ sliders, sliderValues, onSliderChange }) {
	return (
		<div className="space-y-5">
			<div className="space-y-4">
				{sliders.map((slider) => (
					<div key={slider.key}>
						<div className="mb-1 flex items-center justify-between text-sm">
							<label htmlFor={slider.key} className="text-ink">
								{slider.label}
							</label>
							<span className="text-muted">{sliderValues[slider.key]}</span>
						</div>
						<input
							id={slider.key}
							type="range"
							min={slider.min}
							max={slider.max}
							step={slider.step}
							value={sliderValues[slider.key]}
							onChange={(event) =>
								onSliderChange(slider.key, Number(event.target.value))
							}
							className="w-full accent-primary"
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default SliderPanel
