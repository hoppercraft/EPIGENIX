import DnaHelix from '../components/DnaHelix'
import AnimatedCounter from '../components/AnimatedCounter'
import { IconDna, IconChart, IconShield, IconBrain, IconArrowRight, IconGitHub, IconSparkle } from '../components/Icons'

const FEATURES = [
	{
		icon: IconDna,
		title: 'Genomic Analysis',
		description: 'Map SNP variants like TCF7L2, APOE4, and NOD2 to disease risk with real genetic evidence.',
		bg: 'rgba(45, 212, 191, 0.12)',
		fg: 'rgb(45, 212, 191)',
	},
	{
		icon: IconChart,
		title: 'Live Risk Modeling',
		description: 'Interactive sliders compute risk in real-time using weighted gene × environment models.',
		bg: 'rgba(139, 92, 246, 0.12)',
		fg: 'rgb(139, 92, 246)',
	},
	{
		icon: IconShield,
		title: 'Explainable UI',
		description: 'See exactly which genetic markers and lifestyle factors drive your risk score.',
		bg: 'rgba(59, 130, 246, 0.12)',
		fg: 'rgb(59, 130, 246)',
	},
	{
		icon: IconBrain,
		title: 'Multi-Disease Support',
		description: 'Explore Alzheimer\'s, Crohn\'s, and Type 2 Diabetes with disease-specific anatomy maps.',
		bg: 'rgba(236, 72, 153, 0.12)',
		fg: 'rgb(236, 72, 153)',
	},
]

const STATS = [
	{ value: 3, suffix: '', label: 'Disease Models' },
	{ value: 10, suffix: '+', label: 'SNP Markers' },
	{ value: 9, suffix: '', label: 'Risk Factors' },
	{ value: 100, suffix: '%', label: 'Client-Side' },
]

function Home({ onEnterProject }) {
	return (
		<div className="relative min-h-screen overflow-hidden">
			{/* Background effects */}
			<div className="bg-orbs" />
			<div className="grid-pattern" />

			{/* ====================== NAV ====================== */}
			<nav className="anim-fade-in relative z-10 flex items-center justify-between px-6 py-5 sm:px-10">
				<div className="flex items-center gap-3">
					<img src="/EPIGENIX.png" alt="EpiGeniX" className="h-10 w-auto object-contain" />
				</div>
				<div className="flex items-center gap-3">
					<a
						href="https://github.com/hoppercraft/EPIGENIX"
						target="_blank"
						rel="noreferrer"
						className="btn-ghost !px-4 !py-2 text-xs"
					>
						<IconGitHub className="text-base" /> GitHub
					</a>
				</div>
			</nav>

			{/* ====================== HERO ====================== */}
			<section className="relative z-10 mx-auto max-w-5xl px-6 pb-16 pt-12 text-center sm:px-10 sm:pt-20">
				{/* DNA Helix behind hero */}
				<div className="pointer-events-none absolute inset-0 mx-auto max-w-md overflow-hidden" style={{ opacity: 0.5 }}>
					<DnaHelix />
				</div>

				<div className="relative z-10 mx-auto max-w-3xl space-y-8">
					{/* Badge */}
					<div className="anim-fade-up">
						<span className="badge">
							<IconSparkle className="text-xs" />
							BioHackathon 2026
						</span>
					</div>

					{/* Headline */}
					<h1 className="anim-fade-up anim-delay-1 font-[Outfit] text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
						<span className="text-[rgb(var(--on-surface))]">Decode Your </span>
						<span className="gradient-text">Epigenetic</span>
						<br />
						<span className="text-[rgb(var(--on-surface))]">Risk Landscape</span>
					</h1>

					{/* Subtitle */}
					<p className="anim-fade-up anim-delay-2 mx-auto max-w-xl text-lg leading-relaxed text-[rgb(var(--on-surface-variant))]">
						An interactive platform that maps genetic variants to disease risk,
						powered by explainable models and real-time scenario simulation.
					</p>

					{/* CTA buttons */}
					<div className="anim-fade-up anim-delay-3 flex flex-col items-center justify-center gap-4 sm:flex-row">
						<button
							type="button"
							onClick={onEnterProject}
							className="btn-glow text-base"
							id="hero-cta"
						>
							Launch Platform
							<IconArrowRight className="text-lg" />
						</button>
						<a
							className="btn-ghost"
							href="https://github.com/hoppercraft/EPIGENIX"
							target="_blank"
							rel="noreferrer"
						>
							<IconGitHub className="text-base" />
							View Source
						</a>
					</div>
				</div>
			</section>

			{/* ====================== STATS ====================== */}
			<section className="relative z-10 mx-auto max-w-4xl px-6 pb-20 sm:px-10">
				<div className="anim-fade-up anim-delay-4 glass-card grid grid-cols-2 gap-6 p-8 sm:grid-cols-4">
					{STATS.map((stat) => (
						<div key={stat.label} className="text-center">
							<p className="text-3xl font-bold sm:text-4xl">
								<AnimatedCounter end={stat.value} suffix={stat.suffix} />
							</p>
							<p className="mt-1 text-xs font-medium uppercase tracking-wider text-[rgb(var(--on-surface-variant))]">
								{stat.label}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* ====================== FEATURES ====================== */}
			<section className="relative z-10 mx-auto max-w-5xl px-6 pb-24 sm:px-10">
				<div className="mb-12 text-center">
					<h2 className="anim-fade-up font-[Outfit] text-3xl font-bold tracking-tight text-[rgb(var(--on-surface))] sm:text-4xl">
						Why EpiGeniX Stands Out
					</h2>
					<p className="anim-fade-up anim-delay-1 mt-3 text-base text-[rgb(var(--on-surface-variant))]">
						Built for researchers, clinicians, and biohackers who want actionable genetic insights.
					</p>
				</div>

				<div className="grid gap-5 sm:grid-cols-2">
					{FEATURES.map((feature, i) => {
						const Icon = feature.icon
						return (
							<div
								key={feature.title}
								className={`glass-card ui-hover-shadow group p-6 anim-fade-up anim-delay-${i + 2}`}
							>
								<div
									className="mb-4 grid h-12 w-12 place-items-center rounded-xl text-xl"
									style={{
										background: `rgba(${feature.color === 'var(--primary)' ? 'var(--primary)' : feature.color === 'var(--accent-purple)' ? 'var(--accent-purple)' : feature.color === 'var(--accent-blue)' ? 'var(--accent-blue)' : 'var(--accent-pink)'}, 0.12)`,
										color: `rgb(${feature.color === 'var(--primary)' ? 'var(--primary)' : feature.color === 'var(--accent-purple)' ? 'var(--accent-purple)' : feature.color === 'var(--accent-blue)' ? 'var(--accent-blue)' : 'var(--accent-pink)'})`,
									}}
								>
									<Icon />
								</div>
								<h3 className="mb-2 font-[Outfit] text-lg font-semibold text-[rgb(var(--on-surface))]">
									{feature.title}
								</h3>
								<p className="text-sm leading-relaxed text-[rgb(var(--on-surface-variant))]">
									{feature.description}
								</p>
							</div>
						)
					})}
				</div>
			</section>

			{/* ====================== FOOTER ====================== */}
			<footer className="relative z-10 border-t border-[rgba(var(--outline-variant),0.2)] py-8 text-center">
				<p className="text-xs text-[rgb(var(--on-surface-variant))]">
					Built with 🧬 by <strong>Team EpiGeniX</strong> • BioHackathon 2026
				</p>
			</footer>
		</div>
	)
}

export default Home
