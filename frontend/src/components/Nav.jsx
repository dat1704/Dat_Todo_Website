export default function Nav({ onAddClick }) {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-faint/40 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-8" aria-label="Chính">
        <a href="#top" className="text-xl font-semibold tracking-tight">
          TienDat<span className="text-accent">.</span>
        </a>
        <div className="flex items-center gap-1 md:gap-2">
          <a href="#tasks" className="hidden rounded-full px-4 py-2 text-sm text-ink-muted transition-colors hover:text-ink sm:inline-block">
            Công việc
          </a>
          <a href="#progress" className="hidden rounded-full px-4 py-2 text-sm text-ink-muted transition-colors hover:text-ink sm:inline-block">
            Tiến độ
          </a>
          <button
            type="button"
            onClick={onAddClick}
            className="h-10 rounded-full bg-ink px-5 text-sm font-medium text-white transition-opacity hover:opacity-85"
          >
            Thêm việc
          </button>
        </div>
      </nav>
    </header>
  )
}
