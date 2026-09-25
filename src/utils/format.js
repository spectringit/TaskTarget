export function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('ka-GE', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function isOverdue(iso, status) {
  if (!iso || status === 'done') return false
  const today = new Date().toISOString().slice(0, 10)
  return iso < today
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10)
}
