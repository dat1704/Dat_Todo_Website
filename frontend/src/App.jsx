import { useCallback, useEffect, useRef, useState } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Intro from './components/Intro.jsx'
import TaskBoard from './components/TaskBoard.jsx'
import Stats from './components/Stats.jsx'
import Closing from './components/Closing.jsx'
import Toast from './components/Toast.jsx'
import { useTasks } from './hooks/useTasks.js'

export default function App() {
  const [toast, setToast] = useState(null)
  const toastTimer = useRef()

  const notify = useCallback((message) => {
    clearTimeout(toastTimer.current)
    setToast(message)
    toastTimer.current = setTimeout(() => setToast(null), 3500)
  }, [])
  useEffect(() => () => clearTimeout(toastTimer.current), [])

  const { tasks, status, error, reload, add, toggle, remove, stats } = useTasks(notify)

  const focusComposer = useCallback(() => {
    const input = document.getElementById('new-task')
    if (!input) return
    input.scrollIntoView({ behavior: 'smooth', block: 'center' })
    input.focus({ preventScroll: true })
  }, [])

  return (
    <>
      <Nav onAddClick={focusComposer} />
      <main>
        <Hero tasks={tasks} status={status} stats={stats} onAddClick={focusComposer} />
        <Intro />
        <TaskBoard
          tasks={tasks}
          status={status}
          error={error}
          stats={stats}
          onAdd={add}
          onToggle={toggle}
          onRemove={remove}
          onRetry={reload}
        />
        <Stats stats={stats} status={status} />
      </main>
      <Closing onAddClick={focusComposer} />
      <Toast message={toast} />
    </>
  )
}
