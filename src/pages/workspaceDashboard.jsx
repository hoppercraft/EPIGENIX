import { useState } from 'react'
import { Link } from 'react-router-dom'
import Anatomy from '../features/anatomy/Anatomy'
import { diseaseCatalog, diseaseOptions } from '../features/diseases/data/diseases'
import {
	calculateDiseaseRisk,
	getInitialSliderValues,
	getTopDrivers,
} from '../features/diseases/model/risk'

const KNOWN_DISEASES = [
	{ slug: 'crohns-disease', match: ['crohn', "crohn's", 'crohns'] },
	{ slug: 'alzheimers-disease', match: ['alzheimers', "alzheimer's", 'alzheimer'] },
	{ slug: 'type-2-diabetes', match: ['type 2 diabetes', 'type-2 diabetes', 't2d', 'diabetes'] },
]

const detectDisease = (input) => {
	if (!input) {
		return 'unknown'
	}
	const normalized = String(input).toLowerCase()
	const match = KNOWN_DISEASES.find((disease) =>
		disease.match.some((term) => normalized.includes(term))
	)
	return match?.slug ?? 'unknown'
}

const extractDiseaseFromObject = (obj) => {
	if (!obj || typeof obj !== 'object') {
		return null
	}
	const keys = ['disease', 'diagnosis', 'condition', 'phenotype', 'label']
	for (const key of keys) {
		if (obj[key]) {
			return obj[key]
		}
	}
	return null
}

const parseDelimited = (text, delimiter) => {
	const lines = text.split(/\r?\n/).filter(Boolean)
	if (!lines.length) {
		return []
	}
	const headers = lines[0].split(delimiter).map((value) => value.trim())
	return lines.slice(1).map((line) => {
		const values = line.split(delimiter)
		return headers.reduce((acc, header, index) => {
			acc[header] = values[index]?.trim()
			return acc
		}, {})
	})
}

function WorkspaceDashboard() {
	const [uploadState, setUploadState] = useState({
		status: 'idle',
		fileName: '',
		diseaseSlug: null,
		error: '',
	})

	const handleFile = (file) => {
		if (!file) {
			return
		}
		const reader = new FileReader()
		reader.onload = () => {
			try {
				const text = String(reader.result ?? '')
				const ext = file.name.split('.').pop()?.toLowerCase()
				let parsedDisease = null

				if (ext === 'json') {
					const parsed = JSON.parse(text)
					const firstItem = Array.isArray(parsed) ? parsed[0] : parsed
					parsedDisease = extractDiseaseFromObject(firstItem)
				} else {
					const delimiter = ext === 'tsv' ? '\t' : ','
					const rows = parseDelimited(text, delimiter)
					parsedDisease = extractDiseaseFromObject(rows[0])
				}

				const diseaseSlug = detectDisease(parsedDisease)
				setUploadState({
					status: 'ready',
					fileName: file.name,
					diseaseSlug,
					error: '',
				})
			} catch (error) {
				setUploadState({
					status: 'error',
					fileName: file.name,
					diseaseSlug: null,
					error: 'We could not read that file. Please upload a valid JSON, CSV, or TSV.',
				})
			}
		}
		reader.readAsText(file)
	}

	if (uploadState.status !== 'ready') {
		return (
			<div className="relative z-10 max-w-3xl space-y-6">
				<div className="space-y-2">
					<p className="text-xs font-semibold uppercase tracking-widest text-muted">
						Overview
					</p>
					<h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
						Upload patient scan
					</h2>
					<p className="text-base leading-7 text-muted">
						Upload a JSON, CSV, or TSV to detect the disease and load the executive dashboard.
					</p>
				</div>

				<div className="rounded-3xl border border-outline-variant/60 bg-surface-lowest/50 p-6 shadow-glass backdrop-blur-glass">
					<label className="block text-sm font-medium text-ink">Patient data file</label>
					<input
						type="file"
						accept=".json,.csv,.tsv,application/json,text/csv,text/tab-separated-values"
						className="mt-3 block w-full rounded-2xl border border-outline-variant/60 bg-surface-lowest/70 px-4 py-3 text-sm text-ink file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-xs file:font-semibold file:text-on-primary"
						onChange={(event) => handleFile(event.target.files?.[0])}
					/>
					{uploadState.status === 'error' ? (
						<p className="mt-3 text-sm text-red-600">{uploadState.error}</p>
					) : (
						<p className="mt-3 text-xs text-muted">
							We support disease labels in fields like “disease”, “diagnosis”, or “condition”.
						</p>
					)}
				</div>
			</div>
		)
	}

	const selectedDiseaseSlug = uploadState.diseaseSlug
	const isUnknown = selectedDiseaseSlug === 'unknown'
	const defaultDisease = diseaseOptions[0]
	const activeDisease = isUnknown ? defaultDisease : diseaseCatalog[selectedDiseaseSlug]
	const sliderValues = getInitialSliderValues(activeDisease.slug)
	const riskScore = calculateDiseaseRisk(activeDisease.slug, sliderValues)
	const topDrivers = getTopDrivers(activeDisease.slug, sliderValues)

	return (
		<div className="relative z-10 space-y-6">
			<div className="flex flex-wrap items-start justify-between gap-4">
				<div className="space-y-2">
					<p className="text-xs font-semibold uppercase tracking-widest text-muted">
						Overview
					</p>
					<h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
						Executive snapshot
					</h2>
					<p className="text-base leading-7 text-muted">
						{isUnknown
							? 'Disease detection returned Unknown. Showing default demo model.'
							: `Live risk model preview for ${activeDisease.name} with explainable drivers.`}
					</p>
					<p className="text-xs text-muted">
						Source file: {uploadState.fileName}
					</p>
				</div>
				<div className="rounded-2xl border border-outline-variant/60 bg-surface-lowest/60 px-4 py-3 text-sm shadow-sm">
					<p className="text-xs uppercase tracking-wide text-muted">Current risk</p>
					<p className="mt-1 text-2xl font-semibold text-ink">{(riskScore * 100).toFixed(1)}%</p>
				</div>
			</div>

			<section className="grid gap-4 rounded-3xl border border-outline-variant/60 bg-surface-lowest/45 p-5 shadow-glass backdrop-blur-glass lg:grid-cols-[1fr_1.4fr]">
				<div className="space-y-5">
					<div className="rounded-2xl border border-outline-variant/60 bg-surface-lowest/60 p-4">
						<p className="text-xs uppercase tracking-widest text-muted">Top drivers</p>
						<div className="mt-3 space-y-3">
							{topDrivers.map((driver) => (
								<div key={driver.id} className="space-y-2">
									<div className="flex items-center justify-between text-sm">
										<p className="font-medium text-ink">{driver.label}</p>
										<span className="text-muted">{driver.type}</span>
									</div>
									<div className="h-2 w-full overflow-hidden rounded-full bg-surface-lowest/70">
										<div
											className="h-full rounded-full bg-primary/70"
											style={{ width: `${Math.round(driver.contribution * 100)}%` }}
										/>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="rounded-2xl border border-outline-variant/60 bg-surface-lowest/60 p-4 text-sm">
						<p className="text-xs uppercase tracking-widest text-muted">Quick actions</p>
						<div className="mt-3 flex flex-wrap gap-2">
							<button
								type="button"
								className="ui-hover-shadow rounded-full border border-outline-variant/70 bg-surface-lowest/70 px-4 py-2 text-xs font-semibold text-ink"
								disabled
							>
								Load sample patient
							</button>
							<Link
								to={`/project/${activeDisease.slug}`}
								className="ui-hover-shadow inline-flex items-center rounded-full bg-primary px-4 py-2 text-xs font-semibold text-on-primary"
							>
								View disease model
							</Link>
						</div>
						<p className="mt-3 text-xs text-muted">
							Use the disease view to tune sliders and compare scenarios.
						</p>
					</div>
				</div>

				<Anatomy
					diseaseKey={activeDisease.slug}
					diseaseConfig={activeDisease}
					sliderValues={sliderValues}
				/>
			</section>
		</div>
	)
}

export default WorkspaceDashboard