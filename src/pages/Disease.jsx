import { useMemo } from 'react'
import Anatomy from '../features/anatomy/Anatomy'
import DiseaseHeader from '../features/diseases/components/DiseaseHeader'
import ExplainabilityPanel from '../features/diseases/components/ExplainabilityPanel'
import ScenarioPanel from '../features/diseases/components/ScenarioPanel'
import SliderPanel from '../features/diseases/components/SliderPanel'
import SnpCards from '../features/diseases/components/SnpCards'
import useDiseaseState from '../features/diseases/hooks/useDiseaseState'
import useScenarioCompare from '../features/diseases/hooks/useScenarioCompare'
import { useGeneticData } from '../Context/GeneticDataContext'

const GENETIC_MARKERS = {
	'type-2-diabetes': {
		rs7903146: {
			gene: 'TCF7L2',
			riskAllele: 'T',
			maxPoints: 35,
		},
		rs1801282: {
			gene: 'PPARG',
			riskAllele: 'C',
			maxPoints: 20,
		},
		rs5219: {
			gene: 'KCNJ11',
			riskAllele: 'T',
			maxPoints: 20,
		},
		rs13266634: {
			gene: 'SLC30A8',
			riskAllele: 'C',
			maxPoints: 25,
		},
	},

	'crohns-disease': {
		rs2066844: {
			gene: 'NOD2',
			riskAllele: 'T',
			maxPoints: 30,
		},
		rs11209026: {
			gene: 'IL23R',
			riskAllele: 'G',
			maxPoints: 20,
		},
		rs2241880: {
			gene: 'ATG16L1',
			riskAllele: 'G',
			maxPoints: 25,
		},
		rs13361189: {
			gene: 'IRGM',
			riskAllele: 'T',
			maxPoints: 25,
		},
	},

	'alzheimers-disease': {
		rs429358: {
			gene: 'APOE',
			riskAllele: 'C',
			maxPoints: 40,
		},
		demo_APP_variant: {
			gene: 'APP',
			riskAllele: 'G',
			maxPoints: 20,
		},
		demo_PSEN1_variant: {
			gene: 'PSEN1',
			riskAllele: 'G',
			maxPoints: 25,
		},
		rs75932628: {
			gene: 'TREM2',
			riskAllele: 'T',
			maxPoints: 15,
		},
	},
}

function clamp01(value) {
	return Math.max(0, Math.min(1, value))
}

function getVariantsFromGeneticData(geneticData) {
	if (!geneticData) return []

	if (Array.isArray(geneticData)) return geneticData

	if (Array.isArray(geneticData.variants)) {
		return geneticData.variants
	}

	return []
}

function countRiskAlleles(genotype, riskAllele) {
	const cleanGenotype = String(genotype || '')
		.toUpperCase()
		.replace(/[^ACGT]/g, '')

	const cleanRiskAllele = String(riskAllele || '').toUpperCase()

	return cleanGenotype
		.split('')
		.filter((allele) => allele === cleanRiskAllele).length
}

function calculatePatientGeneRisk(geneticData, diseaseKey) {
	const markers = GENETIC_MARKERS[diseaseKey] || {}
	const variants = getVariantsFromGeneticData(geneticData)

	const maxScore = Object.values(markers).reduce(
		(total, marker) => total + marker.maxPoints,
		0
	)

	let score = 0
	const matches = []

	for (const userVariant of variants) {
		const variantId = String(
			userVariant.variant || userVariant.rsid || userVariant.id || ''
		).trim()

		const gene = String(userVariant.gene || '').toUpperCase()

		const markerByVariant = markers[variantId]

		const markerByGene = Object.values(markers).find(
			(marker) => marker.gene.toUpperCase() === gene
		)

		const marker = markerByVariant || markerByGene

		if (!marker) continue

		const riskAlleleCount = countRiskAlleles(
			userVariant.genotype,
			marker.riskAllele
		)

		const points = (Math.min(riskAlleleCount, 2) / 2) * marker.maxPoints

		score += points

		matches.push({
			gene: marker.gene,
			variant: variantId || 'Unknown variant',
			genotype: userVariant.genotype || 'Unknown',
			riskAllele: marker.riskAllele,
			riskAlleleCount,
			points: Math.round(points),
			maxPoints: marker.maxPoints,
		})
	}

	return {
		score: maxScore > 0 ? clamp01(score / maxScore) : 0,
		points: Math.round(score),
		maxPoints: maxScore,
		matches,
	}
}

function combineRiskWithGenetics(modelRisk, geneRisk, hasGeneticMatches) {
	if (!hasGeneticMatches) {
		return modelRisk
	}

	const modelWeight = 0.75
	const geneWeight = 0.25
	const interactionBoost = 0.08 * modelRisk * geneRisk

	return clamp01(modelRisk * modelWeight + geneRisk * geneWeight + interactionBoost)
}

function Disease() {
	const { geneticData } = useGeneticData()

	const {
		selectedDisease,
		diseaseConfig,
		sliderValues,
		setSliderValue,
		diseaseRisk,
		topDrivers,
	} = useDiseaseState()

	const patientGeneRisk = useMemo(() => {
		return calculatePatientGeneRisk(geneticData, selectedDisease)
	}, [geneticData, selectedDisease])

	const finalDiseaseRisk = useMemo(() => {
		return combineRiskWithGenetics(
			diseaseRisk,
			patientGeneRisk.score,
			patientGeneRisk.matches.length > 0
		)
	}, [diseaseRisk, patientGeneRisk])

	const { baselineRisk, improvedRisk, saveBaseline, saveImproved, exportReport } =
		useScenarioCompare({
			diseaseKey: selectedDisease,
			diseaseConfig,
			currentValues: sliderValues,
		})

	const adjustedBaselineRisk =
		baselineRisk == null
			? baselineRisk
			: combineRiskWithGenetics(
					baselineRisk,
					patientGeneRisk.score,
					patientGeneRisk.matches.length > 0
			  )

	const adjustedImprovedRisk =
		improvedRisk == null
			? improvedRisk
			: combineRiskWithGenetics(
					improvedRisk,
					patientGeneRisk.score,
					patientGeneRisk.matches.length > 0
			  )

	const combinedDrivers = useMemo(() => {
		if (!patientGeneRisk.matches.length) {
			return topDrivers
		}

		return [
			{
				id: 'uploaded-genetic-data',
				label: 'Uploaded genotype profile',
				type: 'Genetic',
				contribution: patientGeneRisk.score,
			},
			...topDrivers,
		]
	}, [topDrivers, patientGeneRisk])

	if (!diseaseConfig) {
		return null
	}

	return (
		<div className="relative z-10 max-w-6xl space-y-8">
			<DiseaseHeader
				name={diseaseConfig.name}
				description={diseaseConfig.description}
				riskScore={finalDiseaseRisk}
			/>

			{geneticData && (
				<section className="anim-fade-up glass-card p-5">
					<div className="flex flex-wrap items-start justify-between gap-4">
						<div>
							<p className="text-xs font-semibold uppercase tracking-widest text-[rgb(var(--on-surface-variant))]">
								Uploaded genetic data
							</p>

							<h3 className="mt-2 font-[Outfit] text-xl font-semibold text-[rgb(var(--on-surface))]">
								Patient genotype contribution
							</h3>

							<p className="mt-2 text-sm leading-6 text-[rgb(var(--on-surface-variant))]">
								Patient ID:{' '}
								<span className="font-semibold text-[rgb(var(--on-surface))]">
									{geneticData.patient_id || geneticData.patientId || 'Unknown'}
								</span>
							</p>
						</div>

						<div className="rounded-2xl border border-[rgba(var(--outline-variant),0.6)] bg-[rgba(var(--surface-lowest),0.6)] px-4 py-3 text-sm">
							<p className="text-xs uppercase tracking-widest text-[rgb(var(--on-surface-variant))]">
								Gene risk score
							</p>
							<p className="mt-1 text-2xl font-semibold text-[rgb(var(--on-surface))]">
								{Math.round(patientGeneRisk.score * 100)}%
							</p>
						</div>
					</div>

					{patientGeneRisk.matches.length > 0 ? (
						<div className="mt-5 overflow-hidden rounded-2xl border border-[rgba(var(--outline-variant),0.6)]">
							<div className="overflow-x-auto">
								<table className="w-full min-w-[700px] text-left text-sm">
									<thead className="bg-[rgba(var(--surface-lowest),0.7)] text-xs uppercase tracking-widest text-[rgb(var(--on-surface-variant))]">
										<tr>
											<th className="px-4 py-3">Gene</th>
											<th className="px-4 py-3">Variant</th>
											<th className="px-4 py-3">Genotype</th>
											<th className="px-4 py-3">Risk allele</th>
											<th className="px-4 py-3">Risk allele count</th>
											<th className="px-4 py-3">Points</th>
										</tr>
									</thead>

									<tbody>
										{patientGeneRisk.matches.map((match, index) => (
											<tr
												key={`${match.gene}-${match.variant}-${index}`}
												className="border-t border-[rgba(var(--outline-variant),0.6)]"
											>
												<td className="px-4 py-3 font-semibold text-[rgb(var(--on-surface))]">
													{match.gene}
												</td>
												<td className="px-4 py-3 text-[rgb(var(--on-surface-variant))]">
													{match.variant}
												</td>
												<td className="px-4 py-3 text-[rgb(var(--on-surface-variant))]">
													{match.genotype}
												</td>
												<td className="px-4 py-3 text-[rgb(var(--on-surface-variant))]">
													{match.riskAllele}
												</td>
												<td className="px-4 py-3 text-[rgb(var(--on-surface-variant))]">
													{match.riskAlleleCount}/2
												</td>
												<td className="px-4 py-3 text-[rgb(var(--on-surface-variant))]">
													{match.points}/{match.maxPoints}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					) : (
						<p className="mt-4 rounded-2xl border border-[rgba(var(--outline-variant),0.6)] bg-[rgba(var(--surface-lowest),0.5)] p-4 text-sm leading-6 text-[rgb(var(--on-surface-variant))]">
							Uploaded data was found, but no matching variants were detected for{' '}
							{diseaseConfig.name}.
						</p>
					)}

					<p className="mt-4 text-xs leading-5 text-[rgb(var(--on-surface-variant))]">
						Genetic contribution is calculated by counting risk alleles in the
						uploaded genotype. This is a simplified educational model, not a
						clinical genetic risk calculator.
					</p>
				</section>
			)}

			<section className="anim-fade-up anim-delay-1 glass-card grid gap-6 p-6 lg:grid-cols-[1fr_1.4fr]">
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

			<section className="anim-fade-up anim-delay-2 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
				<ExplainabilityPanel drivers={combinedDrivers} />

				<ScenarioPanel
					baselineRisk={adjustedBaselineRisk}
					improvedRisk={adjustedImprovedRisk}
					onSaveBaseline={saveBaseline}
					onSaveImproved={saveImproved}
					onExport={exportReport}
				/>
			</section>

			<div className="anim-fade-up anim-delay-3">
				<SnpCards markers={diseaseConfig.markers} />
			</div>

			<p className="text-xs text-[rgb(var(--on-surface-variant))]">
				Educational demo only. Risk scores and genetic markers are simplified for
				prototype use.
			</p>
		</div>
	)
}

export default Disease