import RiskGauge from '../../../components/RiskGauge'
import { IconActivity } from '../../../components/Icons'

function DiseaseHeader({ name, description, riskScore }) {
	return (
		<div className="anim-fade-up flex flex-wrap items-start justify-between gap-6">
			<div className="space-y-3">
				<span className="badge">
					<IconActivity className="text-xs" />
					Disease Model
				</span>
				<h2 className="font-[Outfit] text-3xl font-bold tracking-tight text-[rgb(var(--on-surface))] sm:text-4xl">
					{name}
				</h2>
				<p className="max-w-lg text-base leading-relaxed text-[rgb(var(--on-surface-variant))]">
					{description}
				</p>
			</div>
			<div className="anim-scale-in anim-delay-2">
				<RiskGauge value={riskScore} />
			</div>
		</div>
	)
}

export default DiseaseHeader
