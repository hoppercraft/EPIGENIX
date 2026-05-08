import Header from '../layouts/Header/Header'
import Sidebar from '../layouts/Sidebar/Sidebar'

function Project({ onBackHome }) {
	return (
		<div className="project-backdrop flex min-h-screen flex-col bg-background">
			<Header onNavigateHome={onBackHome} isProjectView={true} />

			<div className="grid flex-1 md:grid-cols-[18rem_1fr]">
				<Sidebar />

				<main className="glass-texture relative flex items-center justify-center border-l border-outline-variant/60 bg-surface-lowest/35 p-6 shadow-glass backdrop-blur-glass sm:p-10">
					<div className="relative z-10 w-full max-w-3xl">
						<svg
							viewBox="0 0 640 420"
							role="img"
							aria-label="Glassmorphic human silhouette"
							className="h-auto w-full"
						>
							<defs>
								<linearGradient id="glassFill" x1="240" y1="92" x2="424" y2="364" gradientUnits="userSpaceOnUse">
									<stop offset="0" stopColor="rgba(255, 255, 255, 0.66)" />
									<stop offset="0.55" stopColor="rgba(255, 255, 255, 0.28)" />
									<stop offset="1" stopColor="rgba(255, 255, 255, 0.14)" />
								</linearGradient>

								<linearGradient id="glassStroke" x1="260" y1="110" x2="420" y2="360" gradientUnits="userSpaceOnUse">
									<stop offset="0" stopColor="rgba(255, 255, 255, 0.70)" />
									<stop offset="0.5" stopColor="rgba(255, 255, 255, 0.18)" />
									<stop offset="1" stopColor="rgba(15, 23, 42, 0.08)" />
								</linearGradient>

								<filter id="silShadow" x="0" y="0" width="640" height="420" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
									<feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="rgba(15, 23, 42, 0.12)" />
								</filter>

								<filter id="frostNoise" x="0" y="0" width="640" height="420" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
									<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="noise" />
									<feColorMatrix
										in="noise"
										type="matrix"
										values="
											0 0 0 0 0
											0 0 0 0 0
											0 0 0 0 0
											0 0 0 0.18 0
										"
										result="noiseAlpha"
									/>
									<feComposite in="noiseAlpha" in2="SourceGraphic" operator="in" />
								</filter>

								<path
									id="humanSilhouette"
									d="
										M320 84
										a36 36 0 1 1 0 72
										a36 36 0 1 1 0 -72
										Z
										M296 170
										C292 190 292 202 286 214
										C276 234 254 244 232 252
										C210 260 198 286 204 312
										C210 336 236 342 256 332
										C264 328 270 324 276 318
										C276 338 276 362 274 386
										C272 408 280 424 300 428
										C312 430 320 420 320 404
										C320 420 328 430 340 428
										C360 424 368 408 366 386
										C364 362 364 338 364 318
										C370 324 376 328 384 332
										C404 342 430 336 436 312
										C442 286 430 260 408 252
										C386 244 364 234 354 214
										C348 202 348 190 344 170
										C338 150 328 142 320 142
										C312 142 302 150 296 170
										Z
									"
								/>

								<mask id="humanMask">
									<use href="#humanSilhouette" fill="white" />
								</mask>
							</defs>

							<g filter="url(#silShadow)">
								<use href="#humanSilhouette" fill="url(#glassFill)" stroke="url(#glassStroke)" strokeWidth="1.2" />
								<g mask="url(#humanMask)" opacity="0.55">
									<rect x="0" y="0" width="640" height="420" filter="url(#frostNoise)" fill="rgba(255, 255, 255, 0.16)" />
								</g>
								<use href="#humanSilhouette" fill="none" stroke="rgba(255, 255, 255, 0.32)" strokeWidth="1" />
							</g>
						</svg>
					</div>
				</main>
			</div>
		</div>
	)
}

export default Project
