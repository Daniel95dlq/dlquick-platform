#!/usr/bin/env node
// Uses global fetch (Node 18+). No external deps required.

const domains = (process.env.DOMAINS || 'https://www.dlquick.co.uk,https://dlquick-platform-git-main-dlq.vercel.app?')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean)
  .map((raw) => ({
    url: raw.replace(/\?$/, ''),
    optional: raw.endsWith('?'),
  }))

const timeoutMs = Number(process.env.TIMEOUT_MS || 8000)

function ct(res) { return res.headers.get('content-type') || '' }
async function safeJson(res) {
  try {
    if (ct(res).includes('application/json')) return await res.json()
  } catch (_) {}
  return null
}
async function sampleText(res, max = 160) {
  try {
    const t = await res.text()
    return t.slice(0, max)
  } catch (_) {
    return null
  }
}

async function check(target) {
  const { url, optional } = target
  const controller = new AbortController()
  const t = setTimeout(()=>controller.abort(), timeoutMs)
  try {
    const health = await fetch(new URL('/api/health', url), { signal: controller.signal, redirect: 'follow' })
    const robots = await fetch(new URL('/robots.txt', url), { signal: controller.signal, redirect: 'follow' })
    const host = await fetch(new URL('/api/host', url), { signal: controller.signal, redirect: 'follow' })
    const healthBody = await safeJson(health)
    const hostBody = await safeJson(host)
    const hostSample = hostBody ? null : await sampleText(host)
    const robotsSample = robots.ok ? null : await sampleText(robots)
    return {
      url,
      optional,
      healthOk: health.ok,
      healthStatus: health.status,
      healthType: ct(health),
      healthEnv: healthBody?.env ?? null,
      robotsOk: robots.ok,
      robotsStatus: robots.status,
      robotsType: ct(robots),
      robotsSample,
      hostOk: host.ok,
      hostStatus: host.status,
      hostType: ct(host),
      host: hostBody,
      hostReason: hostBody ? null : (ct(host).includes('application/json') ? 'invalid-json' : 'non-json'),
      hostSample,
    }
  } catch (e) {
    return { url, optional, error: e.message || String(e) }
  } finally {
    clearTimeout(t)
  }
}

;(async()=>{
  const results = await Promise.all(domains.map(check))
  const ok = results.every(r => r.optional ? true : (r.healthOk && r.robotsOk && r.hostOk))
  console.log(JSON.stringify({ ok, results }, null, 2))
  if (!ok) process.exit(1)
})()
