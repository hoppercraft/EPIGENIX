import Header from '../layouts/Header/Header'

function Home({ onEnterProject }) {
  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <section className="mx-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-outline-variant/60 bg-surface-lowest/70 shadow-glass backdrop-blur-glass">
        <Header />

        <main className="mx-auto grid max-w-2xl gap-5 px-6 py-16 text-center sm:px-10">
          <p className="mx-auto inline-flex w-fit items-center rounded-full border border-outline-variant/60 bg-primary-container/15 px-3 py-1 text-xs font-medium tracking-widest text-on-primary-container">
            PROJECT FRONT PAGE
          </p>
          <h1 className="text-balance font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Intro to EpiGeniX
          </h1>
          <p className="text-pretty text-base leading-7 text-muted">
            This is a placeholder introduction section for your project. Replace this with your
            mission, goals, and what users should expect when they enter the main platform.
          </p>

          <div className="mt-2 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onEnterProject}
              className="ui-hover-shadow inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-on-primary shadow-glass transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Go to Main Project
            </button>
            <a
              className="ui-hover-shadow inline-flex items-center justify-center rounded-full border border-outline-variant/70 bg-surface-lowest/70 px-6 py-3 text-sm font-semibold text-ink shadow-sm transition hover:bg-surface-lowest"
              href="https://github.com/hoppercraft/EPIGENIX"
              target="_blank"
              rel="noreferrer"
            >
              About us
            </a>
          </div>
        </main>
      </section>
    </div>
  )
}

export default Home
