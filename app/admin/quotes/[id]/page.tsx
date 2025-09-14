import { requireAuth, authOptions } from '../../../../lib/auth'
import { prisma } from '../../../../lib/prisma'
import { UserRole } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'

const STATUSES = ['NEW','CONTACTED','QUOTED','WON','LOST'] as const

export default async function AdminQuoteDetail({ params }: { params: { id: string } }) {
  await requireAuth(UserRole.ADMIN)

  const quote = await (prisma as any).quoteRequest.findUnique({
    where: { id: params.id },
    include: { activities: { orderBy: { createdAt: 'desc' }, include: { user: true } } },
  })
  if (!quote) {
    return (
      <div className="max-w-3xl mx-auto py-10">
        <h1 className="text-xl font-semibold">Quote not found</h1>
        <a className="underline text-sm" href="/admin/quotes">Back</a>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto py-10">
      <a className="underline text-sm" href="/admin/quotes">← Back to quotes</a>
      <h1 className="text-2xl font-semibold mt-2">{quote.serviceTitle}</h1>

      <div className="mt-6 space-y-2 text-sm">
        <div><span className="opacity-70">When:</span> {new Date(quote.createdAt).toISOString().slice(0,16).replace('T',' ')}</div>
        <div><span className="opacity-70">Name:</span> {quote.name}</div>
        <div><span className="opacity-70">Email:</span> {quote.email}</div>
        <div><span className="opacity-70">Phone:</span> {quote.phone}</div>
        <div><span className="opacity-70">Status:</span> {quote.status}</div>
      </div>

      <div className="mt-6">
        <h2 className="font-semibold mb-2">Submitted details</h2>
        <pre className="text-xs bg-black/30 p-3 rounded border border-white/10 overflow-auto">{JSON.stringify(quote.payload, null, 2)}</pre>
      </div>

      <StatusForm id={quote.id} status={quote.status} />

      <div className="mt-10">
        <h2 className="font-semibold mb-2">Activity</h2>
        {quote.activities?.length ? (
          <ul className="text-sm divide-y divide-white/10 border border-white/10 rounded">
            {quote.activities.map((a: any) => (
              <li key={a.id} className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="opacity-70">{new Date(a.createdAt).toISOString().slice(0,16).replace('T',' ')}</span>
                    <span className="mx-2">—</span>
                    <span>{a.fromStatus} → {a.toStatus}</span>
                    {a.note && <span className="ml-2 opacity-80">({a.note})</span>}
                  </div>
                  <div className="opacity-70 text-xs">{a.user?.email || 'system'}</div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-sm opacity-70">No activity yet.</div>
        )}
      </div>
    </div>
  )
}

function StatusForm({ id, status }: { id: string, status: string }) {
  return (
    <form className="mt-8" action={updateStatus}>
      <input type="hidden" name="id" value={id} />
      <label className="text-sm mr-2">Update status:</label>
      <select name="status" defaultValue={status} className="bg-transparent border rounded px-2 py-1 text-sm">
        {STATUSES.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
  <input name="note" placeholder="Note (optional)" className="ml-3 bg-transparent border rounded px-2 py-1 text-sm w-56" />
  <button className="ml-3 inline-flex items-center justify-center bg-dlq-gold text-[#0E2640] hover:bg-dlq-gold/80 rounded px-3 py-1.5 text-sm">Save</button>
    </form>
  )
}

async function updateStatus(formData: FormData) {
  'use server'
  const id = (formData.get('id') as string) || ''
  const status = (formData.get('status') as string) || ''
  const note = (formData.get('note') as string) || undefined
  if (!id || !STATUSES.includes(status as any)) return
  const current = await (prisma as any).quoteRequest.findUnique({ where: { id }, select: { status: true } })
  if (!current) return
  const session = await getServerSession(authOptions)
  const userId = (session?.user as any)?.id as string | undefined
  // record activity and update status in a transaction
  await (prisma as any).$transaction([
    (prisma as any).quoteRequest.update({ where: { id }, data: { status } }),
    (prisma as any).quoteActivity.create({
      data: {
        quoteId: id,
        fromStatus: current.status,
        toStatus: status,
    changedBy: userId,
    note,
      }
    })
  ])
  revalidatePath(`/admin/quotes/${id}`)
  revalidatePath('/admin/quotes')
}
