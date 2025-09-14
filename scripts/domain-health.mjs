#!/usr/bin/env node
import fetch from 'node-fetch';

const domains = (process.env.DOMAINS || 'https://www.dlquick.co.uk,https://dlquick-platform-git-main-dlq.vercel.app')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean)

const timeoutMs = Number(process.env.TIMEOUT_MS || 8000)

async function check(url) {
  const controller = new AbortController()
  const t = setTimeout(()=>controller.abort(), timeoutMs)
  try {
    const health = await fetch(new URL('/api/health', url), { signal: controller.signal })
    const robots = await fetch(new URL('/robots.txt', url), { signal: controller.signal })
    const host = await fetch(new URL('/api/host', url), { signal: controller.signal })
    return {
      url,
      healthOk: health.ok,
      healthEnv: (await health.json()).env,
      robotsOk: robots.ok,
      hostOk: host.ok,
      host: host.ok ? await host.json() : null,
    }
  } catch (e) {
    return { url, error: e.message || String(e) }
  } finally {
    clearTimeout(t)
  }
}

;(async()=>{
  const results = await Promise.all(domains.map(check))
  const ok = results.every(r => r.healthOk && r.robotsOk && r.hostOk)
  console.log(JSON.stringify({ ok, results }, null, 2))
  if (!ok) process.exit(1)
})()
