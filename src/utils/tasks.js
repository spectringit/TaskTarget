const PRIORITY_WEIGHT = { high: 0, medium: 1, low: 2 }

export function filterAndSortTasks(tasks, { q, status, priority, sort }) {
  const term = q.trim().toLowerCase()
  return tasks
    .filter((t) => (status === 'all' || t.status === status) && (priority === 'all' || t.priority === priority))
    .filter((t) => !term || t.title.toLowerCase().includes(term) || t.description.toLowerCase().includes(term))
    .sort((a, b) => {
      if (sort === 'due') return a.dueDate.localeCompare(b.dueDate)
      if (sort === 'created') return b.createdAt.localeCompare(a.createdAt)
      return PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority]
    })
}

export function getStats(tasks) {
  const today = new Date().toISOString().slice(0, 10)
  return {
    total: tasks.length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    done: tasks.filter((t) => t.status === 'done').length,
    overdue: tasks.filter((t) => t.status !== 'done' && t.dueDate < today).length,
  }
}
