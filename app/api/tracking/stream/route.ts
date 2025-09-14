export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const orderId = searchParams.get('orderId') || 'unknown'

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder()
      let eta = 20
      let tick = 0
      const id = setInterval(() => {
        tick++
        eta = Math.max(0, eta - 1)
        const payload = {
          orderId,
          status: eta === 0 ? 'arrived' : 'in_route',
          etaMinutes: eta,
          position: { lat: 51.5074 + Math.random()/100, lng: -0.1278 + Math.random()/100 },
          updatedAt: new Date().toISOString(),
        }
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`))
        if (eta === 0 || tick >= 30) {
          clearInterval(id)
          controller.close()
        }
      }, 2000)
    },
    cancel() {},
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  })
}
