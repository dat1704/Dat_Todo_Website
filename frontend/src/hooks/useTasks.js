import { useCallback, useEffect, useMemo, useState } from 'react'
import * as api from '../api/tasks.js'

const byNewest = (a, b) => new Date(b.createdAt) - new Date(a.createdAt)

/**
 * Quản lý danh sách task với optimistic update.
 * `notify(message)` được gọi khi một thao tác thất bại và đã rollback.
 */
export function useTasks(notify) {
  const [tasks, setTasks] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setStatus('loading')
    setError(null)
    try {
      const data = await api.getTasks()
      setTasks([...data].sort(byNewest))
      setStatus('ready')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const add = useCallback(
    async (rawTitle) => {
      const title = rawTitle.trim()
      if (!title) return false
      const tempId = `temp-${Date.now()}`
      const now = new Date().toISOString()
      const temp = { _id: tempId, title, status: 'active', completedAt: null, createdAt: now, updatedAt: now, pending: true }
      setTasks((prev) => [temp, ...prev])
      try {
        const saved = await api.createTask(title)
        setTasks((prev) => prev.map((t) => (t._id === tempId ? saved : t)))
        return true
      } catch (err) {
        setTasks((prev) => prev.filter((t) => t._id !== tempId))
        notify?.(`Không thêm được công việc. ${err.message}`)
        return false
      }
    },
    [notify],
  )

  const toggle = useCallback(
    async (task) => {
      const nextStatus = task.status === 'complete' ? 'active' : 'complete'
      const optimistic = {
        ...task,
        status: nextStatus,
        completedAt: nextStatus === 'complete' ? new Date().toISOString() : null,
      }
      setTasks((prev) => prev.map((t) => (t._id === task._id ? optimistic : t)))
      try {
        const saved = await api.updateTask(task._id, { status: nextStatus })
        setTasks((prev) => prev.map((t) => (t._id === task._id ? saved : t)))
      } catch (err) {
        setTasks((prev) => prev.map((t) => (t._id === task._id ? task : t)))
        notify?.(`Không cập nhật được. ${err.message}`)
      }
    },
    [notify],
  )

  const remove = useCallback(
    async (task) => {
      setTasks((prev) => prev.filter((t) => t._id !== task._id))
      try {
        await api.deleteTask(task._id)
      } catch (err) {
        if (err.status === 404) return // đã bị xóa ở nơi khác
        setTasks((prev) => [...prev, task].sort(byNewest))
        notify?.(`Không xóa được. ${err.message}`)
      }
    },
    [notify],
  )

  const stats = useMemo(() => {
    const done = tasks.filter((t) => t.status === 'complete')
    const total = tasks.length
    const lastDone = [...done]
      .filter((t) => t.completedAt)
      .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))[0]
    return {
      total,
      done: done.length,
      active: total - done.length,
      percent: total ? Math.round((done.length / total) * 100) : 0,
      lastDone,
    }
  }, [tasks])

  return { tasks, status, error, reload: load, add, toggle, remove, stats }
}
