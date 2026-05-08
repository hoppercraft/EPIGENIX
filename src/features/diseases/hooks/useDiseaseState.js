import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { diseaseCatalog, diseaseOptions } from '../data/diseases'
import {
	calculateDiseaseRisk,
	getInitialSliderValues,
	getTopDrivers,
} from '../model/risk'

const useDiseaseState = () => {
	const { diseaseSlug } = useParams()
	const defaultDisease = diseaseOptions[0]?.slug
	const selectedDisease = diseaseCatalog[diseaseSlug] ? diseaseSlug : defaultDisease
	const diseaseConfig = diseaseCatalog[selectedDisease]

	const [sliderValuesByDisease, setSliderValuesByDisease] = useState(() =>
		Object.fromEntries(
			diseaseOptions.map(({ slug }) => [slug, getInitialSliderValues(slug)])
		)
	)

	const sliderValues = sliderValuesByDisease[selectedDisease]
	const diseaseRisk = useMemo(
		() => calculateDiseaseRisk(selectedDisease, sliderValues),
		[selectedDisease, sliderValues]
	)
	const topDrivers = useMemo(
		() => getTopDrivers(selectedDisease, sliderValues),
		[selectedDisease, sliderValues]
	)

	const setSliderValue = (key, value) => {
		setSliderValuesByDisease((prev) => ({
			...prev,
			[selectedDisease]: {
				...prev[selectedDisease],
				[key]: value,
			},
		}))
	}

	return {
		selectedDisease,
		diseaseConfig,
		sliderValues,
		setSliderValue,
		diseaseRisk,
		topDrivers,
	}
}

export default useDiseaseState
