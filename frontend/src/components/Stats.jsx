import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal.jsx'

const timeFmt = new Intl.DateTimeFormat('vi-VN', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })

function ProgressRing({ percent }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  const r = 76
  const c = 2 * Math.PI * r

  // Vòng tròn chạy tới giá trị khi cuộn tới
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return setShown(true)
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setShown(true), io.disconnect()), { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const value = shown ? percent : 0
  return (
    <div ref={ref} className="relative mx-auto size-48 md:size-56">
      <svg viewBox="0 0 180 180" className="progress-ring size-full -rotate-90" aria-hidden="true">
        <circle cx="90" cy="90" r={r} fill="none" stroke="white" strokeOpacity="0.7" strokeWidth="10" />
        <circle
          cx="90"
          cy="90"
          r={r}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (value / 100) * c}
          style={{ transition: 'stroke-dashoffset 1200ms cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-content-center text-center">
        <span className="text-5xl font-light tracking-tight md:text-6xl">
          {percent}
          <span className="text-2xl text-ink-muted">%</span>
        </span>
        <span className="mt-1 text-sm text-ink-muted">hoàn thành</span>
      </div>
    </div>
  )
}

function StatCard({ label, value, note, delay, className = '' }) {
  return (
    <Reveal delay={delay} className={`flex flex-col justify-between rounded-3xl bg-surface p-6 md:p-8 ${className}`}>
      <p className="text-sm text-ink-muted">{label}</p>
      <div className="mt-8">
        <p className="text-5xl font-light tracking-tight md:text-6xl">{value}</p>
        {note && <p className="mt-2 text-sm text-ink-muted">{note}</p>}
      </div>
    </Reveal>
  )
}

export default function Stats({ stats, status }) {
  const ready = status === 'ready'
  const show = (n) => (ready ? n : '–')

  return (
    <section id="progress" className="scroll-mt-16 px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-xl">
          <h2 className="text-4xl font-medium tracking-tight md:text-6xl">Tiến độ</h2>
          <p className="mt-4 text-lg text-ink-muted">Một cái nhìn là đủ để biết hôm nay bạn đã đi được bao xa.</p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-3 md:grid-rows-2 md:gap-4">
          <Reveal variant="scale" className="hero-gradient col-span-2 flex flex-col justify-between rounded-3xl p-7 md:col-span-1 md:row-span-2 md:p-8">
            <p className="text-sm text-ink-muted">Tỉ lệ hoàn thành</p>
            <div className="py-10">
              <ProgressRing percent={ready ? stats.percent : 0} />
            </div>
            <p className="text-sm text-ink-muted">
              {ready ? `${stats.done} trên ${stats.total} việc đã xong` : 'Đang tải…'}
            </p>
          </Reveal>
          <StatCard label="Đang làm" value={show(stats.active)} note="việc còn chờ" delay={80} />
          <StatCard label="Hoàn thành" value={show(stats.done)} note="việc đã xong" delay={160} />
          <StatCard label="Tổng cộng" value={show(stats.total)} note="việc đã ghi lại" delay={240} className="col-span-2 md:col-span-1" />
          <Reveal delay={320} className="col-span-2 flex flex-col justify-between rounded-3xl bg-ink p-7 text-white md:col-span-1 md:p-8">
            <p className="text-sm text-white/60">Vừa hoàn thành</p>
            {stats.lastDone ? (
              <div className="mt-8">
                <p className="line-clamp-2 text-2xl font-light leading-snug">{stats.lastDone.title}</p>
                <p className="mt-2 text-sm text-white/60">{timeFmt.format(new Date(stats.lastDone.completedAt))}</p>
              </div>
            ) : (
              <p className="mt-8 text-2xl font-light leading-snug text-white/80">Chưa có. Việc đầu tiên đang chờ bạn.</p>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
