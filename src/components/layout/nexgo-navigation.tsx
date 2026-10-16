type NavigationIconProps = {
  name: "upload" | "analysis" | "dashboard";
};

function NavigationIcon({ name }: NavigationIconProps) {
  if (name === "upload") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none">
        <path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "analysis") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none">
        <path d="M4 18.5 9 13l3.5 3 7-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15.5 7H19v3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none">
      <rect x="4" y="4" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="4" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="4" y="14" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="14" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function NexgoNavigation() {
  return (
    <aside className="border-b border-border-subtle bg-sidebar/92 px-4 py-3 backdrop-blur-xl sm:min-h-dvh sm:w-24 sm:border-r sm:border-b-0 sm:px-3 sm:py-5">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 sm:h-full sm:flex-col sm:justify-start">
        <div className="flex shrink-0 items-center gap-2.5 sm:flex-col sm:gap-2" aria-label="NEXGO">
          <span className="relative grid size-10 place-items-center overflow-hidden rounded-xl border border-accent-blue/35 bg-gradient-to-br from-blue-500/25 to-violet-600/20 text-sm font-bold tracking-tight text-white shadow-[0_0_24px_rgba(56,189,248,0.2)]">
            <span className="absolute inset-x-2 top-2 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
            NX
          </span>
          <span className="text-sm font-semibold tracking-[0.18em] text-white sm:text-[0.68rem] sm:tracking-[0.12em]">NEXGO</span>
        </div>

        <nav aria-label="Navegação principal" className="flex items-center gap-1 sm:mt-10 sm:w-full sm:flex-col sm:gap-3">
          <div aria-current="page" className="flex min-h-11 items-center gap-2 rounded-xl border border-accent-blue/25 bg-blue-500/12 px-3 text-accent-blue shadow-[0_0_22px_rgba(37,99,235,0.12)] sm:w-full sm:flex-col sm:justify-center sm:gap-1 sm:px-1 sm:py-2">
            <NavigationIcon name="upload" />
            <span className="text-[0.69rem] font-medium">Upload</span>
          </div>

          <div aria-disabled="true" title="Análises — em breve" className="hidden min-h-11 items-center gap-2 rounded-xl px-3 text-text-muted sm:flex sm:w-full sm:flex-col sm:justify-center sm:gap-1 sm:px-1 sm:py-2">
            <NavigationIcon name="analysis" />
            <span className="text-[0.65rem] font-medium">Análises</span>
            <span className="sr-only">Funcionalidade futura</span>
          </div>

          <div aria-disabled="true" title="Dashboard — em breve" className="hidden min-h-11 items-center gap-2 rounded-xl px-3 text-text-muted sm:flex sm:w-full sm:flex-col sm:justify-center sm:gap-1 sm:px-1 sm:py-2">
            <NavigationIcon name="dashboard" />
            <span className="text-[0.65rem] font-medium">Dashboard</span>
            <span className="sr-only">Funcionalidade futura</span>
          </div>
        </nav>

        <span className="hidden rounded-full border border-border-subtle px-2 py-1 text-[0.6rem] font-medium tracking-[0.14em] text-text-muted uppercase sm:mt-auto sm:block">Beta</span>
      </div>
    </aside>
  );
}
