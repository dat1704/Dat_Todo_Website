import { useState } from 'react'
import { ListChecks, Plus, RotateCw } from 'lucide-react'
import Reveal from './Reveal.jsx'
import TaskItem from './TaskItem.jsx'

const FILTERS = [
  { id: 'all', label: 'Tất cả' },
  { id: 'active', label: 'Đang làm' },
  { id: 'complete', label: 'Hoàn thành' },
]

const EMPTY_TEXT = {
  all: ['Chưa có việc nào.', 'Gõ việc đầu tiên vào ô phía trên rồi nhấn Enter.'],
  active: ['Không còn việc nào đang làm.', 'Mọi thứ đã xong. Nghỉ ngơi một chút nhé.'],
  complete: ['Chưa hoàn thành việc nào.', 'Đánh dấu một việc để thấy nó ở đây.'],
}

function Composer({ onAdd }) {
  const [value, setValue] = useState('')
  const submit = async (e) => {
    e.preventDefault()
    if (!value.trim()) return
    const title = value
    setValue('')
    const ok = await onAdd(title)
    if (!ok) setValue(title) // trả lại nội dung nếu lưu thất bại
  }
  return (
    <form onSubmit={submit} className="relative">
      <label htmlFor="new-task" className="sr-only">
        Công việc mới
      </label>
      <input
        id="new-task"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Hôm nay cần làm gì?"
        autoComplete="off"
        maxLength={200}
        className="h-14 w-full scroll-mt-28 rounded-full bg-surface pl-6 pr-16 text-base outline-none transition placeholder:text-ink-muted focus:ring-2 focus:ring-accent/40 sm:pr-32"
      />
      <button
        type="submit"
        disabled={!value.trim()}
        aria-label="Thêm công việc"
        className="absolute right-1.5 top-1.5 flex h-11 items-center gap-1.5 rounded-full bg-ink px-3.5 text-sm font-medium text-white transition-opacity hover:opacity-85 disabled:opacity-30 sm:px-5"
      >
        <Plus className="size-4" strokeWidth={2} />
        <span className="hidden sm:inline">Thêm</span>
      </button>
    </form>
  )
}

function Skeleton() {
  return (
    <ul aria-hidden="true" className="divide-y divide-ink-faint/50">
      {[70, 45, 60, 35].map((w, i) => (
        <li key={i} className="flex items-center gap-4 py-5">
          <span className="size-7 rounded-full bg-surface" />
          <span className="h-3.5 animate-pulse rounded-full bg-surface" style={{ width: `${w}%` }} />
        </li>
      ))}
    </ul>
  )
}

export default function TaskBoard({ tasks, status, error, stats, onAdd, onToggle, onRemove, onRetry }) {
  const [filter, setFilter] = useState('all')
  const visible = filter === 'all' ? tasks : tasks.filter((t) => t.status === filter)
  const counts = { all: stats.total, active: stats.active, complete: stats.done }

  return (
    <section id="tasks" className="scroll-mt-16 pb-24 md:pb-36">
      {/* Dải chữ ghost */}
      <div className="overflow-hidden" aria-hidden="true">
        <Reveal variant="fade" className="flex justify-center gap-8 whitespace-nowrap text-6xl font-light tracking-tight text-ink-faint md:gap-16 md:text-8xl">
          <span>Ghi lại</span>
          <span>Tập trung</span>
          <span>Hoàn thành</span>
        </Reveal>
      </div>

      <div className="px-4 md:px-8">
        <Reveal className="mt-10 text-center">
          <p className="text-lg font-medium md:text-xl">
            Mọi thứ bạn cần
            <br />
            để làm xong việc.
          </p>
        </Reveal>

        <div className="mx-auto mt-20 max-w-2xl md:mt-28">
          <Reveal className="flex flex-col items-center text-center">
            <span className="grid size-14 place-items-center rounded-2xl bg-ink text-white">
              <ListChecks className="size-6" strokeWidth={1.5} />
            </span>
            <h2 className="mt-6 text-4xl font-medium tracking-tight md:text-6xl">Công việc</h2>
            <p className="mt-3 text-ink-muted">
              {status === 'ready' ? `${stats.active} việc đang chờ bạn` : 'Danh sách việc của bạn'}
            </p>
          </Reveal>

          <Reveal delay={100} className="mt-10">
            <Composer onAdd={onAdd} />
          </Reveal>

          <Reveal delay={160} className="mt-6 flex justify-center">
            <div className="inline-flex rounded-full bg-surface p-1" role="group" aria-label="Lọc công việc">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  aria-pressed={filter === f.id}
                  className={`rounded-full px-3.5 py-2 text-sm transition-colors sm:px-5 ${
                    filter === f.id ? 'bg-white text-ink shadow-sm' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {f.label}
                  <span className="ml-1.5 text-xs text-ink-muted">{counts[f.id]}</span>
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={220} className="mt-8">
            {status === 'loading' && <Skeleton />}

            {status === 'error' && (
              <div className="rounded-3xl bg-surface px-6 py-12 text-center">
                <p className="text-lg">Không tải được danh sách.</p>
                <p className="mt-1 text-sm text-ink-muted">{error}</p>
                <button
                  type="button"
                  onClick={onRetry}
                  className="mt-6 inline-flex h-11 items-center gap-2 rounded-full border border-ink-faint px-5 text-sm font-medium transition-colors hover:border-ink"
                >
                  <RotateCw className="size-4" strokeWidth={1.75} />
                  Thử lại
                </button>
              </div>
            )}

            {status === 'ready' && visible.length === 0 && (
              <div className="hero-gradient rounded-3xl px-6 py-14 text-center">
                <p className="text-xl font-light">{EMPTY_TEXT[filter][0]}</p>
                <p className="mt-2 text-sm text-ink-muted">{EMPTY_TEXT[filter][1]}</p>
              </div>
            )}

            {status === 'ready' && visible.length > 0 && (
              <ul className="divide-y divide-ink-faint/50 border-y border-ink-faint/50">
                {visible.map((t) => (
                  <TaskItem key={t._id} task={t} onToggle={onToggle} onRemove={onRemove} />
                ))}
              </ul>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
