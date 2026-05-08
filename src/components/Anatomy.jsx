import { useMemo, useState, useId } from 'react'
import { calculateDiseaseRisk } from '../config/diseaseAnatomyConfig'

const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value))

function Anatomy({ diseaseKey, diseaseConfig, sliderValues }) {
	const [hoveredMarker, setHoveredMarker] = useState(null)
	const titleId = useId()
	const descId = useId()
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
				<svg
					viewBox="0 0 100 160"
					role="img"
					aria-labelledby={`${titleId} ${descId}`}
					className="anatomy-svg w-full max-w-xs"
				>
					<title id={titleId}>Stylized anatomy map for {diseaseConfig.name}</title>
					<desc id={descId}>
						Human body with highlighted disease regions and red gene markers scaled by risk.
					</desc>
					<defs>
						<linearGradient id="bodyGlassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="rgba(255,255,255,0.66)" />
							<stop offset="100%" stopColor="rgba(194,230,242,0.24)" />
						</linearGradient>
						<radialGradient id="bodyHighlight" cx="30%" cy="20%" r="70%">
							<stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
							<stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
						</radialGradient>
					</defs>

					<g className="anatomy-body">
						<circle cx="50" cy="17" r="11" className="anatomy-shell" />
						<rect x="38" y="28" width="24" height="46" rx="12" className="anatomy-shell" />
						<rect x="26" y="32" width="10" height="39" rx="5" className="anatomy-shell" />
						<rect x="64" y="32" width="10" height="39" rx="5" className="anatomy-shell" />
						<rect x="41" y="74" width="8" height="60" rx="4" className="anatomy-shell" />
						<rect x="51" y="74" width="8" height="60" rx="4" className="anatomy-shell" />
						<ellipse cx="50" cy="48" rx="20" ry="30" className="anatomy-highlight" />
					</g>

					<g className="anatomy-regions">
						{diseaseConfig.affectedRegions.map((region) => (
							<ellipse
								key={region.id}
								cx={region.cx}
								cy={region.cy}
								rx={region.rx}
								ry={region.ry}
								className="anatomy-region"
							>
								<title>{region.label}</title>
							</ellipse>
						))}
					</g>

					<g className="anatomy-markers">
						{markerData.map((marker) => (
							<circle
								key={marker.rsId}
								cx={marker.x}
								cy={marker.y}
								r={marker.radius}
								opacity={marker.opacity}
								className="risk-marker"
								onMouseEnter={() => setHoveredMarker(marker)}
								onFocus={() => setHoveredMarker(marker)}
								onMouseLeave={() => setHoveredMarker(null)}
								onBlur={() => setHoveredMarker(null)}
								tabIndex={0}
							>
								<title>
									{marker.gene} ({marker.rsId}) • {(marker.contribution * 100).toFixed(1)}%
								</title>
							</circle>
						))}
					</g>
				</svg>

				<div className="space-y-3 rounded-2xl border border-outline-variant/60 bg-surface-lowest/60 p-4 text-sm shadow-sm">
					<p className="font-medium text-ink">Legend</p>
					<p className="text-muted">Highlighted regions indicate disease-affected anatomy.</p>
					<p className="text-muted">
						<span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500 align-middle" />{' '}
						Red dots = gene/SNP risk markers. Size/opacity scale with current risk.
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
			</div>
		</section>
	)
}

export default Anatomy
