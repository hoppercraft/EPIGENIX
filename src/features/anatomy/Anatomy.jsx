import { useMemo, useState } from 'react'
import { calculateDiseaseRisk } from '../diseases/model/risk'
import AnatomyLegend from './components/AnatomyLegend'
import AnatomyMap from './components/AnatomyMap'

const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value))

function Anatomy({ diseaseKey, diseaseConfig, sliderValues }) {
	const [hoveredMarker, setHoveredMarker] = useState(null)
	const diseaseRisk = calculateDiseaseRisk(diseaseKey, sliderValues)

	const markerData = useMemo(
		() =>
			diseaseConfig.markers.map((marker) => {
				const contribution = clamp(diseaseRisk * marker.weight)
				return {
					...marker,
					contribution,
					radius: 3.5 + contribution * 3.8,
					opacity: 0.35 + contribution * 0.65,
				}
			}),
		[diseaseConfig.markers, diseaseRisk]
	)

	return (
		<section className="rounded-3xl border border-outline-variant/60 bg-surface-lowest/45 p-5 shadow-glass backdrop-blur-glass">
			<div className="mb-4 flex flex-wrap items-center justify-between gap-2">
				<h3 className="font-display text-xl font-semibold text-ink">Anatomy risk map</h3>
				<p className="text-sm text-muted">Disease intensity: {(diseaseRisk * 100).toFixed(1)}%</p>
			</div>

			<div className="anatomy-grid">
				<AnatomyMap
					diseaseConfig={diseaseConfig}
					markerData={markerData}
					onMarkerHover={setHoveredMarker}
					onMarkerBlur={() => setHoveredMarker(null)}
				/>
				<AnatomyLegend hoveredMarker={hoveredMarker} diseaseRisk={diseaseRisk} />
			</div>
		</section>
	)
}

export default Anatomy
