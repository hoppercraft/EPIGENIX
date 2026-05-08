import { calculateDiseaseRisk } from '../model/risk'

const buildScenarioReport = ({
	diseaseKey,
	diseaseConfig,
	currentValues,
	baselineValues,
	improvedValues,
}) => {
	const baselineRisk = baselineValues
		? calculateDiseaseRisk(diseaseKey, baselineValues)
		: null
	const improvedRisk = improvedValues
		? calculateDiseaseRisk(diseaseKey, improvedValues)
		: null
	const currentRisk = calculateDiseaseRisk(diseaseKey, currentValues)

	return {
		disease: diseaseConfig?.name ?? diseaseKey,
		timestamp: new Date().toISOString(),
		current: {
			values: currentValues,
			riskScore: Number((currentRisk * 100).toFixed(1)),
		},
		baseline: baselineValues
			? {
				values: baselineValues,
				riskScore: Number((baselineRisk * 100).toFixed(1)),
			}
			: null,
		improved: improvedValues
			? {
				values: improvedValues,
				riskScore: Number((improvedRisk * 100).toFixed(1)),
			}
			: null,
	}
}

const downloadJson = (data, fileName = 'epigenix-report.json') => {
	const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
	const url = URL.createObjectURL(blob)
	const anchor = document.createElement('a')
	anchor.href = url
	anchor.download = fileName
	anchor.click()
	URL.revokeObjectURL(url)
}

export { buildScenarioReport, downloadJson }
