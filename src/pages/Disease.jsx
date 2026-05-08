// src/pages/Disease.jsx

import { useParams } from 'react-router-dom'

const diseaseNames = {
	'type-2-diabetes': 'Type 2 diabetes',
	'crohns-disease': "Crohn’s disease",
	'alzheimers-disease': 'Alzheimer’s disease',
}

function Disease() {
	const { diseaseSlug } = useParams()

	const diseaseName = diseaseNames[diseaseSlug] || 'Disease'

	return (
		<div className="relative z-10 max-w-4xl">
			<h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
				{diseaseName}
			</h2>

			<p className="mt-3 text-base leading-7 text-muted">
				This page contains information and workspace content for {diseaseName}.
			</p>
		</div>
	)
}

export default Disease