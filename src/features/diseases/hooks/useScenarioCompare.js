import { useMemo, useState } from 'react'
import { calculateDiseaseRisk } from '../model/risk'
import { buildScenarioReport, downloadJson } from '../utils/exportReport'

const useScenarioCompare = ({ diseaseKey, diseaseConfig, currentValues }) => {
	const [scenariosByDisease, setScenariosByDisease] = useState({})

	const diseaseScenario = scenariosByDisease[diseaseKey] ?? {}
	const baselineValues = diseaseScenario.baseline ?? null
	const improvedValues = diseaseScenario.improved ?? null

	const baselineRisk = useMemo(
		() => (baselineValues ? calculateDiseaseRisk(diseaseKey, baselineValues) : null),
		[diseaseKey, baselineValues]
	)
	const improvedRisk = useMemo(
		() => (improvedValues ? calculateDiseaseRisk(diseaseKey, improvedValues) : null),
		[diseaseKey, improvedValues]
	)

	const saveScenario = (type) => {
		setScenariosByDisease((prev) => ({
			...prev,
			[diseaseKey]: {
				...prev[diseaseKey],
				[type]: currentValues,
			},
		}))
	}

	const exportReport = () => {
		const report = buildScenarioReport({
			diseaseKey,
			diseaseConfig,
			currentValues,
			baselineValues,
			improvedValues,
		})
		downloadJson(report, `epigenix-${diseaseKey}-report.json`)
	}

	return {
		baselineValues,
		improvedValues,
		baselineRisk,
		improvedRisk,
		saveBaseline: () => saveScenario('baseline'),
		saveImproved: () => saveScenario('improved'),
		exportReport,
	}
}

export default useScenarioCompare
