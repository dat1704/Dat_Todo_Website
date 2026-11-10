import { Check, X } from 'lucide-react'

const dateFmt = new Intl.DateTimeFormat('vi-VN', { day: 'numeric', month: 'short' })
const timeFmt = new Intl.DateTimeFormat('vi-VN', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })

export default function TaskItem({ task, onToggle, onRemove }) {
  const done = task.status === 'complete'
  const meta = done && task.completedAt
    ? `Hoàn thành ${timeFmt.format(new Date(task.completedAt))}`
    : `Tạo ${dateFmt.format(new Date(task.createdAt))}`

  return (
    <li className={`group animate-task-in flex items-center gap-4 py-4 ${task.pending ? 'opacity-60' : ''}`}>
      <button
        type="button"
        onClick={() => onToggle(task)}
        disabled={task.pending}
        aria-label={done ? `Đánh dấu chưa xong: ${task.title}` : `Đánh dấu hoàn thành: ${task.title}`}
        aria-pressed={done}
        className={`grid size-7 shrink-0 place-items-center rounded-full border transition-colors duration-200 ${
          done ? 'border-success bg-success text-white' : 'border-ink-faint text-transparent hover:border-ink-muted'
        }`}
      >
        <Check className="size-4" strokeWidth={2.5} />
      </button>

      <div className="min-w-0 flex-1">
        <p className={`break-words text-base transition-colors md:text-lg ${done ? 'text-ink-muted line-through' : ''}`}>
          {task.title}
        </p>
        <p className="mt-0.5 text-xs text-ink-muted">{task.pending ? 'Đang lưu…' : meta}</p>
      </div>

      <button
        type="button"
        onClick={() => onRemove(task)}
        disabled={task.pending}
        aria-label={`Xóa: ${task.title}`}
        className="grid size-9 shrink-0 place-items-center rounded-full text-ink-muted transition hover:bg-surface hover:text-danger focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100"
      >
        <X className="size-4" strokeWidth={1.75} />
      </button>
    </li>
  )
}
