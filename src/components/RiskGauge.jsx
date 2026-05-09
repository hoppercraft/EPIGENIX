import { useMemo } from 'react'

/** Animated SVG radial gauge that visualizes risk as a circular arc with glow. */
function RiskGauge({ value = 0, size = 140, strokeWidth = 10, label = 'Risk Score' }) {
	const percentage = Math.round(value * 100)
	const radius = (size - strokeWidth) / 2
	const circumference = 2 * Math.PI * radius

	const riskColor = useMemo(() => {
		if (value < 0.3) return { r: 34, g: 197, b: 94, label: 'Low' }
		if (value < 0.6) return { r: 250, g: 204, b: 21, label: 'Moderate' }
		return { r: 239, g: 68, b: 68, label: 'High' }
	}, [value])

	const color = `rgb(${riskColor.r}, ${riskColor.g}, ${riskColor.b})`
	const glowColor = `rgba(${riskColor.r}, ${riskColor.g}, ${riskColor.b}, 0.4)`
	const dashOffset = circumference - (value * circumference)

	return (
		<div className="flex flex-col items-center gap-2">
			<div className="relative" style={{ width: size, height: size }}>
				<svg
					width={size}
					height={size}
					className="-rotate-90"
					style={{ filter: `drop-shadow(0 0 12px ${glowColor})` }}
				>
					{/* Background track */}
					<circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						stroke="rgba(51, 65, 85, 0.3)"
						strokeWidth={strokeWidth}
						fill="none"
					/>
					{/* Progress arc */}
					<circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						stroke={color}
						strokeWidth={strokeWidth}
						fill="none"
						strokeLinecap="round"
						strokeDasharray={circumference}
						strokeDashoffset={dashOffset}
						style={{
							transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.5s ease',
						}}
					/>
				</svg>
				{/* Center label */}
				<div className="absolute inset-0 flex flex-col items-center justify-center">
					<span className="text-2xl font-bold font-[Outfit]" style={{ color }}>{percentage}%</span>
					<span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: `rgba(${riskColor.r}, ${riskColor.g}, ${riskColor.b}, 0.7)` }}>
						{riskColor.label}
					</span>
				</div>
			</div>
			<span className="text-xs font-medium uppercase tracking-widest text-[rgb(var(--on-surface-variant))]">
				{label}
			</span>
		</div>
	)
}

export default RiskGauge
