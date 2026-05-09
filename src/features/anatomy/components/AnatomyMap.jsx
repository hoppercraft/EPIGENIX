import { useId } from 'react'

function AnatomyMap({ diseaseConfig, markerData, onMarkerHover, onMarkerBlur }) {
	const titleId = useId()
	const descId = useId()

	return (
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
					<stop offset="0%" stopColor="rgba(45,212,191,0.12)" />
					<stop offset="100%" stopColor="rgba(139,92,246,0.06)" />
				</linearGradient>
				<radialGradient id="bodyHighlight" cx="30%" cy="20%" r="70%">
					<stop offset="0%" stopColor="rgba(45,212,191,0.15)" />
					<stop offset="100%" stopColor="rgba(45,212,191,0.02)" />
				</radialGradient>
				{/* Glow filter for markers */}
				<filter id="riskGlow" x="-50%" y="-50%" width="200%" height="200%">
					<feGaussianBlur stdDeviation="2" result="blur" />
					<feMerge>
						<feMergeNode in="blur" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
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
						filter="url(#riskGlow)"
						onMouseEnter={() => onMarkerHover(marker)}
						onFocus={() => onMarkerHover(marker)}
						onMouseLeave={onMarkerBlur}
						onBlur={onMarkerBlur}
						tabIndex={0}
					>
						<title>
							{marker.gene} ({marker.rsId}) • {(marker.contribution * 100).toFixed(1)}%
						</title>
					</circle>
				))}
			</g>
		</svg>
	)
}

export default AnatomyMap
