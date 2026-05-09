import { useMemo, useState } from 'react'
import { calculateDiseaseRisk } from '../diseases/model/risk'
import AnatomyLegend from './components/AnatomyLegend'
import AnatomyMap from './components/AnatomyMap'

const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value))

function Anatomy({ diseaseKey, diseaseConfig, sliderValues }) {
	const [hoveredMarker, setHoveredMarker] = useState(null)
	const diseaseRisk = calculateDiseaseRisk(diseaseKey, sliderValues)

	const markerData = useMemo(
		() => {
			const region = diseaseConfig.affectedRegions?.[0]
			const numMarkers = diseaseConfig.markers.length

			return diseaseConfig.markers.map((marker, index) => {
				const contribution = clamp(diseaseRisk * marker.weight)
				
				let x = marker.x
				let y = marker.y

				// Auto-sync marker position with the region's center
				if (region) {
					// Distribute markers evenly in a tight cluster inside the region
					const angle = (index / numMarkers) * Math.PI * 2 - Math.PI / 2
					const rX = (region.rx || 10) * 0.4
					const rY = (region.ry || 10) * 0.4
					x = region.cx + Math.cos(angle) * rX
					y = region.cy + Math.sin(angle) * rY
				}

				return {
					...marker,
					x,
					y,
					contribution,
					radius: 1.8 + contribution * 3.0,
					opacity: 0.35 + contribution * 0.65,
				}
			})
		},
		[diseaseConfig, diseaseRisk]
	)

	return (
		<section className="glass-card p-5">
			<div className="mb-4 flex flex-wrap items-center justify-between gap-2">
				<h3 className="font-[Outfit] text-lg font-bold text-[rgb(var(--on-surface))]">
					Anatomy Risk Map
				</h3>
				<span className="rounded-lg bg-[rgba(var(--primary),0.1)] px-3 py-1 text-xs font-semibold text-[rgb(var(--primary))]">
					Intensity: {(diseaseRisk * 100).toFixed(1)}%
				</span>
			</div>

			<div className="anatomy-grid">
				<AnatomyMap
					diseaseConfig={diseaseConfig}
					markerData={markerData}
					onMarkerHover={setHoveredMarker}
					onMarkerBlur={() => setHoveredMarker(null)}
					hoveredMarker={hoveredMarker}
				/>
				<AnatomyLegend hoveredMarker={hoveredMarker} diseaseRisk={diseaseRisk} />
			</div>
		</section>
	)
}

export default Anatomy
