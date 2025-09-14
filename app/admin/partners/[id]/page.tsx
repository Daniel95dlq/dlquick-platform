import { requireAuth, authOptions } from '../../../../lib/auth'
import { prisma } from '../../../../lib/prisma'
import { UserRole } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'

const STATUSES = ['NEW','REVIEWING','APPROVED','REJECTED'] as const

export default async function AdminPartnerDetail({ params }: { params: { id: string } }) {
  await requireAuth(UserRole.ADMIN)

  const app = await (prisma as any).partnerApplication.findUnique({
    where: { id: params.id },
    include: { activities: { orderBy: { createdAt: 'desc' }, include: { user: true } } },
  })
  if (!app) {
    return (
      <div className="max-w-3xl mx-auto py-10">
        <h1 className="text-xl font-semibold">Application not found</h1>
        <a className="underline text-sm" href="/admin/partners">Back</a>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto py-10">
      <a className="underline text-sm" href="/admin/partners">← Back to applications</a>
      <h1 className="text-2xl font-semibold mt-2">{app.type} — {app.name}</h1>

      <div className="mt-6 space-y-2 text-sm">
        <div><span className="opacity-70">When:</span> {new Date(app.createdAt).toISOString().slice(0,16).replace('T',' ')}</div>
        <div><span className="opacity-70">Email:</span> {app.email}</div>
        <div><span className="opacity-70">Phone:</span> {app.phone}</div>
        <div><span className="opacity-70">Company:</span> {app.company || '-'}</div>
        <div><span className="opacity-70">Status:</span> {app.status}</div>
      </div>

      <div className="mt-6">
        <h2 className="font-semibold mb-2">Submitted details</h2>
        <pre className="text-xs bg-black/30 p-3 rounded border border-white/10 overflow-auto">{JSON.stringify(app.payload, null, 2)}</pre>
      </div>

      <StatusForm id={app.id} status={app.status} />

      <div className="mt-10">
        <h2 className="font-semibold mb-2">Activity</h2>
        {app.activities?.length ? (
          <ul className="text-sm divide-y divide-white/10 border border-white/10 rounded">
            {app.activities.map((a: any) => (
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
  const current = await (prisma as any).partnerApplication.findUnique({ where: { id }, select: { status: true } })
  if (!current) return
  const session = await getServerSession(authOptions)
  const userId = (session?.user as any)?.id as string | undefined
  await (prisma as any).$transaction([
    (prisma as any).partnerApplication.update({ where: { id }, data: { status } }),
    (prisma as any).partnerApplicationActivity.create({
      data: {
        applicationId: id,
        fromStatus: current.status,
        toStatus: status,
        changedBy: userId,
        note,
      }
    })
  ])
  revalidatePath(`/admin/partners/${id}`)
  revalidatePath('/admin/partners')
}
