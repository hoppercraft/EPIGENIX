import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Anatomy from '../features/anatomy/Anatomy'
import { diseaseCatalog, diseaseOptions } from '../features/diseases/data/diseases'
import {
	calculateDiseaseRisk,
	getInitialSliderValues,
	getTopDrivers,
} from '../features/diseases/model/risk'
import RiskGauge from '../components/RiskGauge'
import { IconUpload, IconFile, IconCheckCircle, IconArrowRight, IconActivity } from '../components/Icons'

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
	const [uploadState, setUploadState] = useState({
		status: 'idle',
		fileName: '',
		diseaseSlug: null,
		error: '',
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
			} catch {
				setUploadState({
					status: 'error',
					fileName: file.name,
					diseaseSlug: null,
					error: 'Could not parse that file. Please upload a valid JSON, CSV, or TSV.',
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
			<div className="relative z-10 mx-auto max-w-3xl space-y-8">
				{/* Header */}
				<div className="anim-fade-up space-y-3">
					<span className="badge">
						<IconActivity className="text-xs" />
						Overview
					</span>
					<h2 className="font-[Outfit] text-3xl font-bold tracking-tight text-[rgb(var(--on-surface))] sm:text-4xl">
						Upload Patient Scan
					</h2>
					<p className="max-w-lg text-base leading-relaxed text-[rgb(var(--on-surface-variant))]">
						Upload a JSON, CSV, or TSV file to auto-detect the disease and generate an executive risk dashboard.
					</p>
				</div>

				{/* Upload zone */}
				<div
					className={`anim-fade-up anim-delay-1 glass-card group cursor-pointer p-8 text-center transition-all duration-300 ${
						isDragging
							? 'border-[rgb(var(--primary))] bg-[rgba(var(--primary),0.05)] shadow-[0_0_30px_rgba(var(--primary),0.15)]'
							: 'hover:border-[rgba(var(--primary),0.3)]'
					}`}
					onDrop={handleDrop}
					onDragOver={handleDragOver}
					onDragLeave={() => setIsDragging(false)}
					onClick={() => fileInputRef.current?.click()}
					role="button"
					tabIndex={0}
					id="upload-zone"
				>
					<div className={`mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl text-2xl transition-all duration-300 ${
						isDragging
							? 'bg-[rgba(var(--primary),0.15)] text-[rgb(var(--primary))] scale-110'
							: 'bg-[rgba(var(--outline-variant),0.1)] text-[rgb(var(--on-surface-variant))] group-hover:bg-[rgba(var(--primary),0.1)] group-hover:text-[rgb(var(--primary))]'
					}`}>
						<IconUpload />
					</div>
					<p className="mb-2 text-base font-semibold text-[rgb(var(--on-surface))]">
						{isDragging ? 'Drop your file here' : 'Drag & drop patient data'}
					</p>
					<p className="text-sm text-[rgb(var(--on-surface-variant))]">
						or click to browse • JSON, CSV, TSV supported
					</p>
					<input
						ref={fileInputRef}
						type="file"
						accept=".json,.csv,.tsv,application/json,text/csv,text/tab-separated-values"
						className="hidden"
						onChange={(event) => handleFile(event.target.files?.[0])}
					/>

					{uploadState.status === 'error' && (
						<p className="mt-4 rounded-xl bg-[rgba(239,68,68,0.1)] px-4 py-2 text-sm text-[rgb(var(--risk-high))]">
							{uploadState.error}
						</p>
					)}
				</div>

				{/* Supported fields hint */}
				<div className="anim-fade-up anim-delay-2 glass-card-sm flex items-start gap-3 p-4">
					<IconFile className="mt-0.5 shrink-0 text-base text-[rgb(var(--on-surface-variant))]" />
					<div>
						<p className="text-sm font-medium text-[rgb(var(--on-surface))]">Supported file format</p>
						<p className="mt-1 text-xs text-[rgb(var(--on-surface-variant))]">
							Files should contain a "disease", "diagnosis", or "condition" field to auto-detect the disease model.
						</p>
					</div>
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