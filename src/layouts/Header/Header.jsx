import { IconDna, IconArrowRight } from '../../components/Icons'

function Header({ onNavigateHome, isProjectView = false }) {
	return (
		<header className="relative z-20 flex items-center justify-between gap-4 border-b border-[rgba(var(--outline-variant),0.2)] bg-[rgba(var(--surface),0.8)] px-5 py-3.5 backdrop-blur-xl">
			<button
				type="button"
				className="group inline-flex items-center gap-3 text-left transition-opacity hover:opacity-80"
				onClick={isProjectView ? onNavigateHome : undefined}
			>
				<img src="/EPIGENIX.png" alt="EPIGENIX" className="h-10 w-auto object-contain" /><span className="leading-tight">
					<span className="block font-[Outfit] text-sm font-bold tracking-tight text-[rgb(var(--on-surface))]">
						EpiGeniX
					</span>
					<span className="block text-[10px] font-medium text-[rgb(var(--on-surface-variant))]">
						Epigenetic Risk Platform
					</span>
				</span>
			</button>

			{isProjectView && (
				<button
					type="button"
					onClick={onNavigateHome}
					className="btn-ghost !px-4 !py-2 text-xs"
				>
					<IconArrowRight className="rotate-180 text-sm" />
					Back to Home
				</button>
			)}
		</header>
	)
}

export default Header
