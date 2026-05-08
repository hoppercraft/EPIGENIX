import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Anatomy from '../components/Anatomy'
import {
	diseaseAnatomyConfig,
	diseaseOptions,
	getInitialSliderValues,
	calculateDiseaseRisk,
} from '../config/diseaseAnatomyConfig'

function Disease() {
	const navigate = useNavigate()
	const { diseaseSlug } = useParams()
	const selectedDisease = diseaseAnatomyConfig[diseaseSlug]
		? diseaseSlug
		: diseaseOptions[0].slug
	const diseaseConfig = diseaseAnatomyConfig[selectedDisease]
	const [sliderValuesByDisease, setSliderValuesByDisease] = useState(() =>
		Object.fromEntries(
			diseaseOptions.map(({ slug }) => [slug, getInitialSliderValues(slug)])
		)
	)
	const sliderValues = sliderValuesByDisease[selectedDisease]

	const diseaseRisk = useMemo(
		() => calculateDiseaseRisk(selectedDisease, sliderValues),
		[selectedDisease, sliderValues]
	)

	return (
		<div className="relative z-10 max-w-6xl space-y-6">
			<h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
				{diseaseConfig.name}
			</h2>

			<p className="mt-3 text-base leading-7 text-muted">
				{diseaseConfig.description}
			</p>

			<section className="grid gap-4 rounded-3xl border border-outline-variant/60 bg-surface-lowest/45 p-5 shadow-glass backdrop-blur-glass lg:grid-cols-[1fr_1.4fr]">
				<div className="space-y-5">
					<div>
						<label htmlFor="diseaseSelector" className="mb-1 block text-sm font-medium text-ink">
							Select disease
						</label>
						<select
							id="diseaseSelector"
							value={selectedDisease}
							onChange={(event) => navigate(`/project/${event.target.value}`)}
							className="w-full rounded-xl border border-outline-variant/70 bg-surface-lowest/70 px-3 py-2 text-sm text-ink"
						>
							{diseaseOptions.map((option) => (
								<option key={option.slug} value={option.slug}>
									{option.name}
								</option>
							))}
						</select>
					</div>

					<div className="space-y-4">
						{diseaseConfig.sliders.map((slider) => (
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
										setSliderValuesByDisease((prev) => ({
											...prev,
											[selectedDisease]: {
												...prev[selectedDisease],
												[slider.key]: Number(event.target.value),
											},
										}))
									}
									className="w-full accent-primary"
								/>
							</div>
						))}
					</div>

					<p className="rounded-xl border border-outline-variant/50 bg-surface-lowest/65 px-3 py-2 text-sm text-muted">
						Current normalized risk: <span className="font-semibold text-ink">{(diseaseRisk * 100).toFixed(1)}%</span>
					</p>
				</div>

				<Anatomy
					diseaseKey={selectedDisease}
					diseaseConfig={diseaseConfig}
					sliderValues={sliderValues}
				/>
			</section>
		</div>
	)
}

export default Disease
