import { NexgoNavigation } from "@/components/layout/nexgo-navigation";

function UploadIllustration() {
  return (
    <div className="relative grid size-16 place-items-center rounded-2xl border border-blue-400/25 bg-gradient-to-br from-blue-500/20 via-cyan-400/10 to-violet-500/20 text-accent-blue shadow-[0_0_36px_rgba(56,189,248,0.16)] sm:size-20">
      <span className="absolute inset-2 rounded-xl border border-white/5" />
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-8 sm:size-9" fill="none">
        <path d="M12 15V4m0 0L7.75 8.25M12 4l4.25 4.25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 14.5v3A2.5 2.5 0 0 0 7.5 20h9a2.5 2.5 0 0 0 2.5-2.5v-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function VisionIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none">
      <path d="M3 12s3.5-5 9-5 9 5 9 5-3.5 5-9 5-9-5-9-5Z" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 3v2M12 19v2M3 6l1.5 1M19.5 17l1.5 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function AnalysisIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none">
      <path d="M12 3.5 13.4 8l4.1 1.4-4.1 1.4-1.4 4.7-1.4-4.7-4.1-1.4L10.6 8 12 3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="m18.5 14 .75 2.25L21.5 17l-2.25.75L18.5 20l-.75-2.25L15.5 17l2.25-.75L18.5 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M6 14.5 6.8 17 9 17.8l-2.2.8L6 21l-.8-2.4-2.2-.8 2.2-.8.8-2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-dvh overflow-hidden sm:grid sm:grid-cols-[6rem_minmax(0,1fr)]">
      <NexgoNavigation />

      <main className="relative isolate px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
        <div aria-hidden="true" className="pointer-events-none absolute -top-44 right-[-10rem] -z-10 size-[28rem] rounded-full bg-blue-600/12 blur-[110px]" />
        <div aria-hidden="true" className="pointer-events-none absolute right-[-12rem] bottom-[-10rem] -z-10 size-[30rem] rounded-full bg-orange-500/8 blur-[120px]" />

        <div className="mx-auto w-full max-w-[1200px]">
          <header className="max-w-3xl">
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-accent-blue uppercase">
              <span className="size-1.5 rounded-full bg-accent-blue shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
              Análise de partidas
            </div>
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.08] font-semibold tracking-[-0.04em] text-white">
              Transforme partidas em
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                decisões mais inteligentes.
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
              Envie o vídeo da sua partida para preparar uma análise técnica assistida por inteligência artificial.
            </p>
          </header>

          <section aria-labelledby="upload-title" className="premium-panel upload-grid relative mt-8 overflow-hidden rounded-[var(--radius-feature)] p-4 sm:mt-10 sm:p-6 lg:p-8">
            <div aria-hidden="true" className="pointer-events-none absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-400/70 to-transparent" />
            <div aria-hidden="true" className="pointer-events-none absolute -top-28 left-1/2 size-64 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative flex min-h-[22rem] flex-col items-center justify-center rounded-2xl border border-dashed border-blue-300/25 bg-[#061020]/72 px-5 py-10 text-center sm:min-h-[25rem] sm:px-10">
              <UploadIllustration />
              <p className="mt-7 text-xs font-semibold tracking-[0.16em] text-accent-blue uppercase">Primeiro passo</p>
              <h2 id="upload-title" className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-white sm:text-3xl">
                Adicione o vídeo da partida
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-6 text-text-secondary sm:text-base">
                Na próxima etapa, você poderá selecionar ou arrastar um arquivo para começar. O vídeo permanecerá no seu dispositivo.
              </p>

              <div aria-label="Ação de upload disponível em breve" className="mt-7 inline-flex min-h-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 text-sm font-semibold text-white opacity-75 shadow-[0_10px_28px_rgba(37,99,235,0.24)]">
                Selecionar vídeo
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-text-muted">
                <span>MP4 ou WebM</span>
                <span aria-hidden="true" className="size-1 rounded-full bg-border-active/70" />
                <span>Até 200 MB</span>
                <span aria-hidden="true" className="size-1 rounded-full bg-border-active/70" />
                <span>Processamento local nesta etapa</span>
              </div>
            </div>
          </section>

          <section aria-labelledby="capabilities-title" className="mt-8 sm:mt-10">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.16em] text-text-muted uppercase">O que vem depois</p>
                <h2 id="capabilities-title" className="mt-2 text-xl font-semibold tracking-[-0.02em] text-white sm:text-2xl">
                  Inteligência para ler o jogo
                </h2>
              </div>
              <span className="hidden rounded-full border border-border-subtle bg-surface/70 px-3 py-1.5 text-xs font-medium text-text-muted sm:inline-flex">
                Funcionalidades futuras
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <article className="premium-panel relative overflow-hidden rounded-[var(--radius-card)] p-5 sm:p-6">
                <div aria-hidden="true" className="absolute -top-16 -right-16 size-40 rounded-full bg-blue-500/12 blur-3xl" />
                <div className="relative flex items-start gap-4">
                  <div className="grid size-12 shrink-0 place-items-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-accent-blue">
                    <VisionIcon />
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.14em] text-accent-blue uppercase">Em breve</p>
                    <h3 className="mt-1.5 text-lg font-semibold text-white">Visão Computacional</h3>
                    <p className="mt-2 text-sm leading-6 text-text-secondary">
                      Em breve, identifique jogadores e acompanhe movimentações em campo.
                    </p>
                  </div>
                </div>
              </article>

              <article className="premium-panel relative overflow-hidden rounded-[var(--radius-card)] p-5 sm:p-6">
                <div aria-hidden="true" className="absolute -right-16 -bottom-16 size-40 rounded-full bg-orange-500/10 blur-3xl" />
                <div className="relative flex items-start gap-4">
                  <div className="grid size-12 shrink-0 place-items-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
                    <AnalysisIcon />
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.14em] text-accent-orange uppercase">Em breve</p>
                    <h3 className="mt-1.5 text-lg font-semibold text-white">Análise Inteligente</h3>
                    <p className="mt-2 text-sm leading-6 text-text-secondary">
                      Em breve, transforme dados das partidas em análises técnicas com IA.
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
