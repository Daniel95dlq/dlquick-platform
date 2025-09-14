/*
  Simple smoke tests for the DLQuick Next.js app.
  - Waits for dev server on http://localhost:3000
  - Checks /api/health and /api/db/ping
  - Verifies robots disallow rules and middleware 404 for legal PDFs
  - Exercises /api/quotes POST with a minimal payload
  - Checks SSE headers on /api/tracking/stream
*/

const BASE = process.env.BASE_URL || 'http://localhost:3000'

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

async function waitForServer(timeoutMs = 30000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      const r = await fetch(`${BASE}/api/health`)
      if (r.ok) return true
    } catch {}
    await sleep(500)
  }
  return false
}

async function testHealth() {
  const res = await fetch(`${BASE}/api/health`)
  const json = await res.json().catch(()=>({}))
  const pass = res.ok && json && json.ok === true
  return { name: 'GET /api/health', pass, details: json }
}

async function testDbPing() {
  try {
    const res = await fetch(`${BASE}/api/db/ping`)
    const json = await res.json().catch(()=>({}))
    const pass = res.ok && json && json.ok === true
    return { name: 'GET /api/db/ping', pass, details: json }
  } catch (e) {
    return { name: 'GET /api/db/ping', pass: false, details: String(e) }
  }
}

async function testRobotsAndPdfBlock() {
  const robots = await fetch(`${BASE}/robots.txt`).then(r=>r.text()).catch(()=>"")
  const disallows = [
    '/DLQuick_Web_Platform_and_Legal_Pack.pdf',
    '/DLQuick_Web_Platform_and_Extra_Bomb_Pack.pdf',
    '/DLQuick_Mega_Master_Developer_Pack.pdf',
    '/DLQuick_Mega_Master_Developer_Pack_WITH_WIREFRAMES.pdf',
    '/DLQuick_Project_Summary_for_Developers.pdf',
  ]
  const robotsPass = disallows.every(d => robots.includes(d))
  const pdfResp = await fetch(`${BASE}${disallows[0]}`)
  const pdfPass = pdfResp.status === 404
  return [
    { name: 'GET /robots.txt disallow rules', pass: robotsPass, details: robots.slice(0,200) },
    { name: `GET ${disallows[0]} blocked`, pass: pdfPass, details: `status=${pdfResp.status}` },
  ]
}

async function testQuotes() {
  const payload = {
    serviceSlug: 'test',
    serviceTitle: 'Test',
    data: { name: 'Smoke Tester', email: 'smoke@example.com', phone: '07000000000' },
  }
  const res = await fetch(`${BASE}/api/quotes`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
  })
  const json = await res.json().catch(()=>({}))
  const pass = res.ok && json && (json.ok === true || json.id || json.quote || json.quoteId)
  return { name: 'POST /api/quotes', pass, details: json }
}

async function testSSE() {
  const ctrl = new AbortController()
  const t = setTimeout(()=>ctrl.abort(), 2000)
  try {
    const res = await fetch(`${BASE}/api/tracking/stream?orderId=test-smoke`, { signal: ctrl.signal })
    const ct = res.headers.get('content-type') || ''
    const passHeader = ct.includes('text/event-stream')
    let gotChunk = false
    // try read one chunk (optional)
    if (res.body && res.body.getReader) {
      const reader = res.body.getReader()
      const { value } = await reader.read().catch(()=>({}))
      gotChunk = !!(value && value.length)
    }
    return { name: 'GET /api/tracking/stream (SSE headers/chunk)', pass: passHeader, details: { contentType: ct, gotChunk } }
  } catch (e) {
    return { name: 'GET /api/tracking/stream (SSE headers/chunk)', pass: false, details: String(e) }
  } finally {
    clearTimeout(t)
  }
}

(async () => {
  const up = await waitForServer()
  if (!up) {
    console.error('Server did not become ready on', BASE)
    process.exit(1)
  }

  const results = []
  results.push(await testHealth())
  results.push(await testDbPing())
  results.push(...await testRobotsAndPdfBlock())
  results.push(await testQuotes())
  results.push(await testSSE())

  let failed = 0
  for (const r of results) {
    const status = r.pass ? 'PASS' : 'FAIL'
    console.log(`[${status}] ${r.name}`)
    if (!r.pass) {
      failed++
      if (r.details !== undefined) console.log('  details:', r.details)
    }
  }
  if (failed) {
    console.error(`\n${failed} check(s) failed`)
    process.exit(1)
  } else {
    console.log('\nAll smoke checks passed')
  }
})()
