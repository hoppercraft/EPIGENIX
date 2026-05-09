import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Anatomy from '../features/anatomy/Anatomy'
import { diseaseCatalog, diseaseOptions } from '../features/diseases/data/diseases'
import {
	calculateDiseaseRisk,
	getInitialSliderValues,
	getTopDrivers,
} from '../features/diseases/model/risk'
import { useGeneticData } from '../Context/GeneticDataContext'


const KNOWN_DISEASES = [
	{ slug: 'crohns-disease', match: ['crohn', "crohn's", 'crohns'] },
	{ slug: 'alzheimers-disease', match: ['alzheimers', "alzheimer's", 'alzheimer'] },
	{ slug: 'type-2-diabetes', match: ['type 2 diabetes', 'type-2 diabetes', 't2d', 'diabetes'] },
]

const detectDisease = (input) => {
	if (!input) return 'unknown'
	const normalized = String(input).toLowerCase()
	const match = KNOWN_DISEASES.find((disease) =>
		disease.match.some((term) => normalized.includes(term))
	)
	return match?.slug ?? 'unknown'
}

const extractDiseaseFromObject = (obj) => {
	if (!obj || typeof obj !== 'object') return null
	const keys = ['disease', 'diagnosis', 'condition', 'phenotype', 'label']
	for (const key of keys) {
		if (obj[key]) return obj[key]
	}
	return null
}

const parseDelimited = (text, delimiter) => {
	const lines = text.split(/\r?\n/).filter(Boolean)
	if (!lines.length) return []
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
	const { setGeneticData } = useGeneticData()

	const [uploadState, setUploadState] = useState({
		status: 'idle',
		fileName: '',
		diseaseSlug: null,
		error: '',
		data: null,
	})
	const [isDragging, setIsDragging] = useState(false)
	const fileInputRef = useRef(null)

	const handleFile = (file) => {
		if (!file) return
		const reader = new FileReader()
		reader.onload = () => {
			try {
				const text = String(reader.result ?? '')
				const ext = file.name.split('.').pop()?.toLowerCase()
				let parsedDisease = null
				let parsedData = null

				try {
					parsedData = JSON.parse(text)
					const firstItem = Array.isArray(parsedData) ? parsedData[0] : parsedData
					parsedDisease = extractDiseaseFromObject(firstItem)
				} catch {
					const delimiter = ext === 'tsv' ? '\t' : ','
					const rows = parseDelimited(text, delimiter)
					parsedData = rows
					parsedDisease = extractDiseaseFromObject(rows[0])
				}

				const diseaseSlug = detectDisease(parsedDisease)
				
				setGeneticData(parsedData)

				setUploadState({
					status: diseaseSlug === 'unknown' ? 'stored' : 'ready',
					fileName: file.name,
					diseaseSlug,
					error: '',
					data: parsedData,
				}) 
			} catch (error) {
				setUploadState({
					status: 'error',
					fileName: file.name,
					diseaseSlug: null,
					error: 'We could not read that file. Please upload a valid JSON, CSV, or TSV.',
					data: null,
				})
			}
		}
		reader.readAsText(file)
	}

	const handleDrop = (e) => {
		e.preventDefault()
		setIsDragging(false)
		const file = e.dataTransfer.files?.[0]
		handleFile(file)
	}

	const handleDragOver = (e) => {
		e.preventDefault()
		setIsDragging(true)
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
					Upload a JSON, CSV, or TSV file. EPIGENIX will store and display the
					patient data after upload.
				</p>
			</div>

			<div className="rounded-3xl border border-outline-variant/60 bg-surface-lowest/50 p-6 shadow-glass backdrop-blur-glass">
				<label className="block text-sm font-medium text-ink">
					Patient data file
				</label>

				<input
					type="file"
					accept=".json,.csv,.tsv,.txt,application/json,text/plain,text/csv,text/tab-separated-values"
					className="mt-3 block w-full rounded-2xl border border-outline-variant/60 bg-surface-lowest/70 px-4 py-3 text-sm text-ink file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-xs file:font-semibold file:text-on-primary"
					onChange={(event) => handleFile(event.target.files?.[0])}
				/>

				{uploadState.status === 'error' ? (
					<p className="mt-3 text-sm text-red-600">{uploadState.error}</p>
				) : uploadState.status === 'stored' ? (
					<div className="mt-3 rounded-2xl border border-outline-variant/60 bg-surface-lowest/60 p-4">
						<p className="text-sm font-semibold text-ink">
							File uploaded successfully.
						</p>
						<p className="mt-1 text-xs leading-5 text-muted">
							No disease label was found, so EPIGENIX is staying on the overview
							page. Add a field like{' '}
							<code>"disease": "Type 2 Diabetes"</code> to load a disease
							dashboard.
						</p>
						<p className="mt-2 text-xs text-muted">
							Source file: {uploadState.fileName}
						</p>
					</div>
				) : (
					<p className="mt-3 text-xs text-muted">
						We support disease labels in fields like “disease”, “diagnosis”, or
						“condition”.
					</p>
				)}
			</div>

			{uploadState.data && (
				<section className="rounded-3xl border border-outline-variant/60 bg-surface-lowest/50 p-6 shadow-glass backdrop-blur-glass">
					<div className="flex flex-wrap items-start justify-between gap-4">
						<div>
							<p className="text-xs font-semibold uppercase tracking-widest text-muted">
								Uploaded Patient Data
							</p>
							<h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-ink">
								{uploadState.data.patient_id ||
									uploadState.data.patientId ||
									'Patient data'}
							</h3>
						</div>

						<div className="rounded-2xl border border-outline-variant/60 bg-surface-lowest/60 px-4 py-3 text-sm">
							<p className="text-xs uppercase tracking-wide text-muted">
								Source file
							</p>
							<p className="mt-1 font-medium text-ink">
								{uploadState.fileName}
							</p>
						</div>
					</div>

					<div className="mt-6 grid gap-4 sm:grid-cols-3">
						<article className="rounded-2xl border border-outline-variant/60 bg-surface-lowest/60 p-4">
							<p className="text-xs uppercase tracking-widest text-muted">
								Patient ID
							</p>
							<p className="mt-2 text-sm font-semibold text-ink">
								{uploadState.data.patient_id ||
									uploadState.data.patientId ||
									'Not provided'}
							</p>
						</article>

						<article className="rounded-2xl border border-outline-variant/60 bg-surface-lowest/60 p-4">
							<p className="text-xs uppercase tracking-widest text-muted">
								Age
							</p>
							<p className="mt-2 text-sm font-semibold text-ink">
								{uploadState.data.age || 'Not provided'}
							</p>
						</article>

						<article className="rounded-2xl border border-outline-variant/60 bg-surface-lowest/60 p-4">
							<p className="text-xs uppercase tracking-widest text-muted">
								Suffering disease
							</p>
							<p className="mt-2 text-sm font-semibold text-ink">
								{uploadState.diseaseSlug === 'unknown'
									? 'Not provided'
									: uploadState.diseaseSlug}
							</p>
						</article>
					</div>

					{Array.isArray(uploadState.data.variants) && (
						<div className="mt-6 overflow-hidden rounded-2xl border border-outline-variant/60">
							<div className="bg-surface-lowest/60 px-4 py-3">
								<h4 className="text-sm font-semibold text-ink">
									Variant Report
								</h4>
							</div>

							<div className="overflow-x-auto">
								<table className="w-full min-w-[640px] text-left text-sm">
									<thead className="bg-background/60 text-xs uppercase tracking-widest text-muted">
										<tr>
											<th className="px-4 py-3">Gene</th>
											<th className="px-4 py-3">Variant</th>
											<th className="px-4 py-3">Genotype</th>
										</tr>
									</thead>

									<tbody>
										{uploadState.data.variants.map((variant, index) => (
											<tr
												key={`${variant.gene}-${variant.variant}-${index}`}
												className="border-t border-outline-variant/60"
											>
												<td className="px-4 py-3 font-semibold text-ink">
													{variant.gene || 'Unknown'}
												</td>
												<td className="px-4 py-3 text-muted">
													{variant.variant || variant.rsid || 'Unknown'}
												</td>
												<td className="px-4 py-3 text-muted">
													{variant.genotype || 'Unknown'}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					)}

					<details className="mt-6 rounded-2xl border border-outline-variant/60 bg-black/90 p-4">
						<summary className="cursor-pointer text-sm font-semibold text-green-300">
							Show raw JSON
						</summary>

						<pre className="mt-4 max-h-80 overflow-auto text-xs leading-6 text-green-300">
							{JSON.stringify(uploadState.data, null, 2)}
						</pre>
					</details>
				</section>
			)}
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
		<div className="relative z-10 space-y-8">
			{/* Header */}
			<div className="anim-fade-up flex flex-wrap items-start justify-between gap-6">
				<div className="space-y-3">
					<span className="badge">
						<IconCheckCircle className="text-xs" />
						Executive Snapshot
					</span>
					<h2 className="font-[Outfit] text-3xl font-bold tracking-tight text-[rgb(var(--on-surface))] sm:text-4xl">
						{isUnknown ? 'Demo Risk Model' : activeDisease.name}
					</h2>
					<p className="max-w-lg text-base leading-relaxed text-[rgb(var(--on-surface-variant))]">
						{isUnknown
							? 'Disease detection returned Unknown — showing default demo model.'
							: `Live risk model preview for ${activeDisease.name} with explainable drivers.`}
					</p>
					<p className="flex items-center gap-2 text-xs text-[rgb(var(--on-surface-variant))]">
						<IconFile className="text-sm" />
						{uploadState.fileName}
					</p>
				</div>
				<div className="anim-scale-in anim-delay-2">
					<RiskGauge value={riskScore} label="Current Risk" />
				</div>
			</div>

			{/* Main grid */}
			<section className="anim-fade-up anim-delay-1 glass-card grid gap-6 p-6 lg:grid-cols-[1fr_1.4fr]">
				<div className="space-y-5">
					{/* Top Drivers */}
					<div className="glass-card-sm p-5">
						<p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-[rgb(var(--on-surface-variant))]">
							Top Risk Drivers
						</p>
						<div className="space-y-4">
							{topDrivers.map((driver, i) => (
								<div key={driver.id} className={`space-y-2 anim-fade-up anim-delay-${i + 1}`}>
									<div className="flex items-center justify-between text-sm">
										<p className="font-medium text-[rgb(var(--on-surface))]">{driver.label}</p>
										<span className={`badge-purple !py-0.5 !text-[9px] ${driver.type === 'Gene' ? '' : 'badge'}`}>
											{driver.type}
										</span>
									</div>
									<div className="h-1.5 w-full overflow-hidden rounded-full bg-[rgba(var(--outline-variant),0.2)]">
										<div
											className="h-full rounded-full transition-all duration-700"
											style={{
												width: `${Math.round(driver.contribution * 100)}%`,
												background: `linear-gradient(90deg, rgb(var(--primary)), rgb(var(--accent-purple)))`,
												boxShadow: '0 0 8px rgba(var(--primary), 0.3)',
											}}
										/>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Quick actions */}
					<div className="glass-card-sm p-5">
						<p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-[rgb(var(--on-surface-variant))]">
							Quick Actions
						</p>
						<div className="flex flex-wrap gap-2">
							<button
								type="button"
								className="btn-ghost !px-4 !py-2 text-xs opacity-50"
								disabled
							>
								Load Sample
							</button>
							<Link
								to={`/project/${activeDisease.slug}`}
								className="btn-glow !px-4 !py-2 text-xs"
							>
								View Disease Model
								<IconArrowRight />
							</Link>
						</div>
						<p className="mt-3 text-[11px] text-[rgb(var(--on-surface-variant))]">
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