import { Check } from 'lucide-react'
import Reveal from './Reveal.jsx'

export default function Closing({ onAddClick }) {
  return (
    <>
      <section className="px-4 pb-24 md:px-8 md:pb-36">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="max-w-2xl text-2xl font-light leading-snug text-accent md:text-[2.5rem] md:leading-[1.2]">
              Việc nhỏ cũng đáng được làm cho gọn. Khi mọi thứ nằm đúng chỗ, đầu óc bạn có chỗ cho điều quan trọng hơn.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 text-2xl font-light md:text-[2.5rem]">Bắt đầu với một việc thôi.</p>
          </Reveal>
        </div>
      </section>

      <footer className="bg-ink px-4 pb-10 pt-24 text-white md:px-8 md:pt-32">
        <div className="mx-auto max-w-6xl">
          <Reveal className="flex flex-col items-center text-center">
            <span className="grid size-14 place-items-center rounded-2xl bg-white text-ink">
              <Check className="size-6" strokeWidth={2} />
            </span>
            <p className="mt-8 text-6xl font-light tracking-tight md:text-8xl">
              gọn<span className="text-accent">.</span>
            </p>
            <p className="mt-4 max-w-sm text-white/60">Ghi lại. Tập trung. Hoàn thành.</p>
            <button
              type="button"
              onClick={onAddClick}
              className="mt-10 h-12 rounded-full bg-white px-7 text-sm font-medium text-ink transition-opacity hover:opacity-85"
            >
              Thêm việc mới
            </button>
          </Reveal>

          <Reveal variant="fade" delay={150} className="mt-24 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row">
            <p>© {new Date().getFullYear()} Gọn</p>
            <div className="flex gap-6">
              <a href="#tasks" className="transition-colors hover:text-white">Công việc</a>
              <a href="#progress" className="transition-colors hover:text-white">Tiến độ</a>
              <a href="#top" className="transition-colors hover:text-white">Lên đầu trang</a>
            </div>
          </Reveal>
        </div>
      </footer>
    </>
  )
}
