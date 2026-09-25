import { useEffect, useState } from 'react'

export function getFallbackUrl(seed: string | number) {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/600/400`
}

let poolPromise: Promise<string[]> | null = null
let usedIndex = 0

function fetchImagePool(): Promise<string[]> {
  if (!poolPromise) {
    poolPromise = (async () => {
      try {
        const randomPage = Math.floor(Math.random() * 30) + 1
        const res = await fetch(`https://picsum.photos/v2/list?page=${randomPage}&limit=50`)
        if (!res.ok) throw new Error(`Picsum status ${res.status}`)

        const data: Array<{ id: string }> = await res.json()
        if (Array.isArray(data) && data.length > 0) {
          return data.map((img) => `https://picsum.photos/id/${img.id}/600/400`)
        }
        throw new Error('Empty image pool')
      } catch {
        return Array.from({ length: 30 }, (_, i) =>
          getFallbackUrl(`fallback-${Date.now()}-${i}-${Math.random()}`)
        )
      }
    })()
  }
  return poolPromise
}

export function useOfficePhoto(idSeed?: string) {
  const [state, setState] = useState<{ url: string | null; loading: boolean }>({
    url: null,
    loading: true,
  })

  useEffect(() => {
    let alive = true
    fetchImagePool().then((pool) => {
      if (!alive) return
      const index = usedIndex % pool.length
      usedIndex++
      const url = pool[index] || getFallbackUrl(idSeed || Math.random())
      setState({ url, loading: false })
    })
    return () => {
      alive = false
    }
  }, [idSeed])

  return state
}
