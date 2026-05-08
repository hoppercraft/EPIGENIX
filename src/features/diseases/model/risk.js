import { diseaseCatalog } from '../data/diseases'

const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value))

const normalizeSlider = (slider, value) => {
	const min = slider.min ?? 0
	const max = slider.max ?? 1
	if (max === min) {
		return 0
	}
	return clamp(((value ?? min) - min) / (max - min))
}

const getInitialSliderValues = (diseaseKey) =>
	(diseaseCatalog[diseaseKey]?.sliders ?? []).reduce((acc, slider) => {
		acc[slider.key] = slider.defaultValue
		return acc
	}, {})

const calculateDiseaseRisk = (diseaseKey, sliderValues) => {
	const disease = diseaseCatalog[diseaseKey]
	if (!disease?.computeRisk) {
		return 0
	}
	return clamp(disease.computeRisk(sliderValues ?? {}))
}

const getSliderDrivers = (diseaseKey, sliderValues) => {
	const disease = diseaseCatalog[diseaseKey]
	if (!disease) {
		return []
	}

	return disease.sliders.map((slider) => {
		const normalized = normalizeSlider(slider, sliderValues?.[slider.key])
		const driverValue = slider.direction === 'risk' ? normalized : 1 - normalized
		const contribution = clamp(driverValue * (slider.weight ?? 0.3))

		return {
			id: slider.key,
			label: slider.label,
			type: 'Environment',
			contribution,
			valueLabel: sliderValues?.[slider.key] ?? slider.defaultValue,
		}
	})
}

const getMarkerContributions = (diseaseKey, sliderValues) => {
	const disease = diseaseCatalog[diseaseKey]
	if (!disease) {
		return []
	}
	const diseaseRisk = calculateDiseaseRisk(diseaseKey, sliderValues)
	return disease.markers.map((marker) => ({
		...marker,
		contribution: clamp(diseaseRisk * marker.weight),
	}))
}

const getTopDrivers = (diseaseKey, sliderValues, topCount = 3) => {
	const sliderDrivers = getSliderDrivers(diseaseKey, sliderValues)
	const markerDrivers = getMarkerContributions(diseaseKey, sliderValues).map((marker) => ({
		id: marker.rsId,
		label: `${marker.gene} (${marker.rsId})`,
		type: 'Gene',
		contribution: marker.contribution,
		valueLabel: marker.riskAllele ?? 'Risk allele',
	}))

	return [...sliderDrivers, ...markerDrivers]
		.sort((a, b) => b.contribution - a.contribution)
		.slice(0, topCount)
}

export {
	calculateDiseaseRisk,
	clamp,
	getInitialSliderValues,
	getMarkerContributions,
	getSliderDrivers,
	getTopDrivers,
}
