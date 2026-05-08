import epigenixLogo from "../../assets/EPIGENIX.png";
function Header({ onNavigateHome, isProjectView = false }) {
    return (
        <header className="flex items-center justify-between gap-4 border-b border-outline-variant/60 bg-surface-lowest/70 px-5 py-4 shadow-glass backdrop-blur-glass">
            <button
                type="button"
                className="inline-flex items-center gap-3 text-left"
                onClick={isProjectView ? onNavigateHome : undefined}
            >
                <span
                    className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-xs font-bold tracking-widest text-on-primary"
                    aria-hidden="true"
                >
                    <img src={epigenixLogo} alt="EPIGENIX logo" />
                </span>
                <span className="leading-tight">
                    <span className="block font-display font-semibold tracking-tight text-ink">EpiGeniX</span>
                </span>
            </button>

            {isProjectView && (
                <button
                    type="button"
                    onClick={onNavigateHome}
                    className="ui-hover-shadow inline-flex items-center justify-center rounded-full border border-outline-variant/70 bg-surface-lowest/70 px-4 py-2 text-sm font-semibold text-ink shadow-sm transition hover:bg-surface-lowest"
                >
                    Back to Intro
                </button>
            )}
        </header>
    )
}

export default Header

