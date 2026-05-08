import Anatomy from '../features/anatomy/Anatomy'
import DiseaseHeader from '../features/diseases/components/DiseaseHeader'
import ExplainabilityPanel from '../features/diseases/components/ExplainabilityPanel'
import ScenarioPanel from '../features/diseases/components/ScenarioPanel'
import SliderPanel from '../features/diseases/components/SliderPanel'
import SnpCards from '../features/diseases/components/SnpCards'
import useDiseaseState from '../features/diseases/hooks/useDiseaseState'
import useScenarioCompare from '../features/diseases/hooks/useScenarioCompare'

function Disease() {
	const {
		selectedDisease,
		diseaseConfig,
		sliderValues,
		setSliderValue,
		diseaseRisk,
		topDrivers,
	} = useDiseaseState()
	const { baselineRisk, improvedRisk, saveBaseline, saveImproved, exportReport } =
		useScenarioCompare({
			diseaseKey: selectedDisease,
			diseaseConfig,
			currentValues: sliderValues,
		})

	if (!diseaseConfig) {
		return null
	}

	return (
		<div className="relative z-10 max-w-6xl space-y-6">
			<DiseaseHeader
				name={diseaseConfig.name}
				description={diseaseConfig.description}
				riskScore={diseaseRisk}
			/>

			<section className="grid gap-4 rounded-3xl border border-outline-variant/60 bg-surface-lowest/45 p-5 shadow-glass backdrop-blur-glass lg:grid-cols-[1fr_1.4fr]">
				<SliderPanel
					sliders={diseaseConfig.sliders}
					sliderValues={sliderValues}
					onSliderChange={setSliderValue}
				/>
				<Anatomy
					diseaseKey={selectedDisease}
					diseaseConfig={diseaseConfig}
					sliderValues={sliderValues}
				/>
			</section>

			<section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
				<ExplainabilityPanel drivers={topDrivers} />
				<ScenarioPanel
					baselineRisk={baselineRisk}
					improvedRisk={improvedRisk}
					onSaveBaseline={saveBaseline}
					onSaveImproved={saveImproved}
					onExport={exportReport}
				/>
			</section>

			<SnpCards markers={diseaseConfig.markers} />
			<p className="text-xs text-muted">
				Educational demo only. Risk scores and genetic markers are simplified for prototype use.
			</p>
		</div>
	)
}

export default Disease
