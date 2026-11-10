const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5001/api'

async function request(path, options = {}) {
  let res
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })
  } catch {
    throw new Error('Không kết nối được máy chủ.')
  }
  const data = await res.json().catch(() => null)
  if (!res.ok) {
    const err = new Error(res.status === 404 ? 'Công việc không còn tồn tại.' : 'Máy chủ gặp lỗi, thử lại sau.')
    err.status = res.status
    err.serverMessage = data?.message
    throw err
  }
  return data
}

export const getTasks = () => request('/tasks')

export const createTask = (title) =>
  request('/tasks', { method: 'POST', body: JSON.stringify({ title }) })

export const updateTask = (id, changes) =>
  request(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(changes) })

export const deleteTask = (id) => request(`/tasks/${id}`, { method: 'DELETE' })
