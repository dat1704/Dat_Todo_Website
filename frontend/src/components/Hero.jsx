import { Check } from 'lucide-react'
import Reveal from './Reveal.jsx'

const todayLabel = new Intl.DateTimeFormat('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())

function PhonePreview({ tasks, status, stats }) {
  const preview = tasks.slice(0, 4)
  return (
    <div className="min-h-[400px] w-64 rounded-[2.25rem] border border-white/70 bg-white p-5 shadow-[0_30px_80px_-20px_rgba(40,50,120,0.35)] md:min-h-[460px] md:w-72">
      <div className="mx-auto mb-5 h-1.5 w-14 rounded-full bg-ink-faint/70" />
      <p className="text-xs text-ink-muted first-letter:uppercase">{todayLabel}</p>
      <p className="mt-1 text-2xl font-light tracking-tight">Hôm nay</p>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface">
        <div className="h-full rounded-full bg-accent transition-[width] duration-700" style={{ width: `${stats.percent}%` }} />
      </div>
      <p className="mt-2 text-xs text-ink-muted">
        {stats.done}/{stats.total} đã xong
      </p>
      <ul className="mt-4 space-y-3 pb-2 text-left">
        {status === 'loading' &&
          [0, 1, 2].map((i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="size-5 rounded-full bg-surface" />
              <span className="h-3 flex-1 animate-pulse rounded-full bg-surface" />
            </li>
          ))}
        {status === 'ready' && preview.length === 0 && <li className="text-sm text-ink-muted">Chưa có việc nào.</li>}
        {status === 'error' && <li className="text-sm text-ink-muted">Chưa tải được dữ liệu.</li>}
        {preview.map((t) => {
          const done = t.status === 'complete'
          return (
            <li key={t._id} className="flex items-center gap-3 text-sm">
              <span
                className={`grid size-5 shrink-0 place-items-center rounded-full border ${done ? 'border-success bg-success text-white' : 'border-ink-faint'}`}
              >
                {done && <Check className="size-3" strokeWidth={3} />}
              </span>
              <span className={`truncate ${done ? 'text-ink-muted line-through' : ''}`}>{t.title}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function Hero({ tasks, status, stats, onAddClick }) {
  return (
    <section id="top" className="px-4 pt-16 md:px-8 md:pt-24">
      <div className="text-center">
        <Reveal>
          <p className="text-sm text-ink-muted">Quản lý công việc, tối giản</p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mx-auto mt-4 max-w-3xl text-5xl font-light leading-[1.05] tracking-tight md:text-7xl">
            Mọi việc.
            <br />
            Gọn gàng hơn.
          </h1>
        </Reveal>
        <Reveal delay={160} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onAddClick}
            className="h-12 rounded-full bg-ink px-7 text-sm font-medium text-white transition-opacity hover:opacity-85"
          >
            Bắt đầu ghi việc
          </button>
          <a
            href="#progress"
            className="inline-flex h-12 items-center rounded-full border border-ink-faint px-7 text-sm font-medium transition-colors hover:border-ink"
          >
            Xem tiến độ
          </a>
        </Reveal>
      </div>

      <Reveal variant="scale" delay={240} className="mx-auto mt-14 max-w-6xl md:mt-20">
        <div className="hero-gradient relative flex h-[440px] items-end justify-center overflow-hidden rounded-[2.5rem] md:h-[580px]">
          <p
            aria-hidden="true"
            className="pointer-events-none absolute -left-2 top-8 select-none whitespace-nowrap text-7xl font-light leading-none tracking-tighter text-white/80 md:left-6 md:top-12 md:text-[11rem]"
          >
            gọn
          </p>
          <p
            aria-hidden="true"
            className="pointer-events-none absolute -right-2 bottom-8 select-none whitespace-nowrap text-7xl font-light leading-none tracking-tighter text-white/80 md:bottom-10 md:right-6 md:text-[11rem]"
          >
            việc
          </p>
          <div className="relative translate-y-20 md:translate-y-24">
            <PhonePreview tasks={tasks} status={status} stats={stats} />
          </div>
        </div>
      </Reveal>
    </section>
  )
}
