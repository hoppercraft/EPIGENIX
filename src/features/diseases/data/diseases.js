const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value))

const diseaseCatalog = {
	'type-2-diabetes': {
		name: 'Type 2 Diabetes',
		description: 'Pancreas, liver, and adipose tissue are highlighted for metabolic risk.',
		sliders: [
			{
				key: 'exercise',
				label: 'Exercise (hrs/week)',
				min: 0,
				max: 12,
				step: 0.5,
				defaultValue: 4,
				direction: 'protective',
				weight: 0.2,
			},
			{
				key: 'dietQuality',
				label: 'Diet quality (0-100)',
				min: 0,
				max: 100,
				step: 1,
				defaultValue: 60,
				direction: 'protective',
				weight: 0.35,
			},
			{
				key: 'bmi',
				label: 'BMI',
				min: 18,
				max: 40,
				step: 0.1,
				defaultValue: 27,
				direction: 'risk',
				weight: 0.45,
			},
		],
		affectedRegions: [
			{ id: 'pancreas', label: 'Pancreas', cx: 52, cy: 52, rx: 7, ry: 3.5 },
			{ id: 'liver', label: 'Liver', cx: 45, cy: 46, rx: 9, ry: 5 },
			{ id: 'adipose', label: 'Adipose tissue', cx: 50, cy: 58, rx: 14, ry: 8 },
		],
		markers: [
			{
				gene: 'TCF7L2',
				rsId: 'rs7903146',
				x: 52,
				y: 52,
				weight: 1,
				riskAllele: 'T',
				oddsRatio: '1.37',
				function: 'Regulates insulin secretion in beta cells.',
			},
			{
				gene: 'FTO',
				rsId: 'rs9939609',
				x: 48,
				y: 60,
				weight: 0.9,
				riskAllele: 'A',
				oddsRatio: '1.25',
				function: 'Linked to appetite regulation and adiposity.',
			},
			{
				gene: 'PPARG',
				rsId: 'rs1801282',
				x: 58,
				y: 63,
				weight: 0.82,
				riskAllele: 'G',
				oddsRatio: '1.18',
				function: 'Controls lipid metabolism and insulin sensitivity.',
			},
			{
				gene: 'SLC30A8',
				rsId: 'rs13266634',
				x: 56,
				y: 50,
				weight: 0.75,
				riskAllele: 'T',
				oddsRatio: '1.12',
				function: 'Zinc transporter in pancreatic beta cells.',
			},
		],
		computeRisk: ({ exercise, dietQuality, bmi }) => {
			const exNorm = clamp((exercise ?? 0) / 12)
			const dietNorm = clamp((dietQuality ?? 0) / 100)
			const bmiNorm = clamp(((bmi ?? 18) - 18) / 22)
			return clamp(0.25 + bmiNorm * 0.45 + (1 - dietNorm) * 0.2 + (1 - exNorm) * 0.1)
		},
	},
	'crohns-disease': {
		name: "Crohn's Disease",
		description: 'Intestinal inflammation-associated regions and variants are highlighted.',
		sliders: [
			{
				key: 'inflammationLoad',
				label: 'Inflammation load (0-100)',
				min: 0,
				max: 100,
				step: 1,
				defaultValue: 55,
				direction: 'risk',
				weight: 0.5,
			},
			{
				key: 'fiberIntake',
				label: 'Fiber intake quality (0-100)',
				min: 0,
				max: 100,
				step: 1,
				defaultValue: 45,
				direction: 'protective',
				weight: 0.2,
			},
			{
				key: 'stress',
				label: 'Stress level (0-100)',
				min: 0,
				max: 100,
				step: 1,
				defaultValue: 50,
				direction: 'risk',
				weight: 0.3,
			},
		],
		affectedRegions: [{ id: 'intestine', label: 'Intestine', cx: 50, cy: 59, rx: 11, ry: 10 }],
		markers: [
			{
				gene: 'NOD2',
				rsId: 'rs2066844',
				x: 46,
				y: 56,
				weight: 1,
				riskAllele: 'C',
				oddsRatio: '1.7',
				function: 'Innate immune sensing in gut mucosa.',
			},
			{
				gene: 'IL23R',
				rsId: 'rs11209026',
				x: 53,
				y: 63,
				weight: 0.85,
				riskAllele: 'G',
				oddsRatio: '1.4',
				function: 'Modulates inflammatory signaling pathways.',
			},
			{
				gene: 'ATG16L1',
				rsId: 'rs2241880',
				x: 56,
				y: 58,
				weight: 0.8,
				riskAllele: 'G',
				oddsRatio: '1.35',
				function: 'Autophagy regulation in gut epithelium.',
			},
		],
		computeRisk: ({ inflammationLoad, fiberIntake, stress }) => {
			const inflammationNorm = clamp((inflammationLoad ?? 0) / 100)
			const fiberNorm = clamp((fiberIntake ?? 0) / 100)
			const stressNorm = clamp((stress ?? 0) / 100)
			return clamp(0.2 + inflammationNorm * 0.5 + stressNorm * 0.2 + (1 - fiberNorm) * 0.15)
		},
	},
	'alzheimers-disease': {
		name: "Alzheimer's Disease",
		description: 'Brain-focused markers show variants associated with neurodegenerative risk.',
		sliders: [
			{
				key: 'sleepQuality',
				label: 'Sleep quality (0-100)',
				min: 0,
				max: 100,
				step: 1,
				defaultValue: 62,
				direction: 'protective',
				weight: 0.3,
			},
			{
				key: 'cognitiveActivity',
				label: 'Cognitive activity (0-100)',
				min: 0,
				max: 100,
				step: 1,
				defaultValue: 50,
				direction: 'protective',
				weight: 0.32,
			},
			{
				key: 'vascularHealth',
				label: 'Vascular health (0-100)',
				min: 0,
				max: 100,
				step: 1,
				defaultValue: 58,
				direction: 'protective',
				weight: 0.38,
			},
		],
		affectedRegions: [{ id: 'brain', label: 'Brain', cx: 50, cy: 20, rx: 10, ry: 7 }],
		markers: [
			{
				gene: 'APOE',
				rsId: 'rs429358',
				x: 47,
				y: 20,
				weight: 1,
				riskAllele: 'C',
				oddsRatio: '3.2',
				function: 'Lipid transport and amyloid clearance.',
			},
			{
				gene: 'CLU',
				rsId: 'rs11136000',
				x: 54,
				y: 19,
				weight: 0.78,
				riskAllele: 'C',
				oddsRatio: '1.2',
				function: 'Protein chaperone in stress response.',
			},
			{
				gene: 'PICALM',
				rsId: 'rs3851179',
				x: 50,
				y: 24,
				weight: 0.72,
				riskAllele: 'G',
				oddsRatio: '1.15',
				function: 'Synaptic vesicle trafficking support.',
			},
		],
		computeRisk: ({ sleepQuality, cognitiveActivity, vascularHealth }) => {
			const sleepNorm = clamp((sleepQuality ?? 0) / 100)
			const cogNorm = clamp((cognitiveActivity ?? 0) / 100)
			const vascularNorm = clamp((vascularHealth ?? 0) / 100)
			return clamp(0.24 + (1 - sleepNorm) * 0.2 + (1 - cogNorm) * 0.25 + (1 - vascularNorm) * 0.3)
		},
	},
}

const diseaseOptions = Object.entries(diseaseCatalog).map(([slug, config]) => ({
	slug,
	name: config.name,
}))

export { diseaseCatalog, diseaseOptions }
