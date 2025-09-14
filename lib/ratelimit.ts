const hits = new Map<string, { count: number; ts: number }>()

export function rateLimit(key: string, limit = 20, windowMs = 60_000) {
  const now = Date.now()
  const bucket = hits.get(key)
  if (!bucket || now - bucket.ts > windowMs) {
    hits.set(key, { count: 1, ts: now })
    return { ok: true }
  }
  bucket.count += 1
  if (bucket.count > limit) return { ok: false }
  return { ok: true }
}
