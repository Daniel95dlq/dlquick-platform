"use client"
import { useState } from "react"

type Review = {
  id: string
  createdAt: string | Date
  rating: number
  comment?: string | null
  verified: boolean
  user?: { email?: string | null } | null
  userId?: string
  order?: { orderNumber?: string | null } | null
  orderId?: string
}

export default function ReviewsTable({ items, page, pages, take }: { items: Review[]; page: number; pages: number; take: number }) {
  const [busyId, setBusyId] = useState<string | null>(null)

  const setVerified = async (id: string, verified: boolean) => {
    try {
      setBusyId(id)
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verified }),
      })
      if (!res.ok) throw new Error('Update failed')
      location.reload()
    } catch (e) {
      alert('Failed to update review')
    } finally {
      setBusyId(null)
    }
  }

  const deleteRow = async (id: string) => {
    if (!confirm('Delete this review?')) return
    try {
      setBusyId(id)
      const res = await fetch(`/api/admin/reviews/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      location.reload()
    } catch (e) {
      alert('Failed to delete review')
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm opacity-80">Page {page} / {pages}</div>
        <div className="flex items-center gap-2">
          {page > 1 && <a className="text-xs underline" href={`/admin/reviews?page=${page-1}&limit=${take}`}>Prev</a>}
          {page < pages && <a className="text-xs underline" href={`/admin/reviews?page=${page+1}&limit=${take}`}>Next</a>}
        </div>
      </div>
      <div className="border border-white/10 rounded overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="text-left p-2">When</th>
              <th className="text-left p-2">User</th>
              <th className="text-left p-2">Order</th>
              <th className="text-left p-2">Rating</th>
              <th className="text-left p-2">Comment</th>
              <th className="text-left p-2">Verified</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((r) => (
              <Row key={r.id} r={r} busy={busyId === r.id} onVerify={setVerified} onDelete={deleteRow} />
            ))}
            {items.length === 0 && (
              <tr><td colSpan={7} className="p-4 text-center opacity-70">No records</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Row({ r, busy, onVerify, onDelete }: { r: Review; busy: boolean; onVerify: (id: string, v: boolean)=>void; onDelete: (id: string)=>void }) {
  const when = new Date(r.createdAt).toISOString().slice(0,16).replace('T',' ')
  return (
    <tr className="border-t border-white/10">
      <td className="p-2 whitespace-nowrap">{when}</td>
      <td className="p-2">{r.user?.email || r.userId}</td>
      <td className="p-2">{r.order?.orderNumber || r.orderId}</td>
      <td className="p-2">{r.rating}★</td>
      <td className="p-2 max-w-[420px] truncate" title={r.comment || ''}>{r.comment || '-'}</td>
      <td className="p-2">{r.verified ? 'Yes' : 'No'}</td>
      <td className="p-2">
        <div className="flex items-center gap-2">
          {r.verified ? (
            <button disabled={busy} onClick={()=>onVerify(r.id, false)} className="text-xs px-2 py-1 rounded border border-dlq-gold text-dlq-gold disabled:opacity-50">Unverify</button>
          ) : (
            <button disabled={busy} onClick={()=>onVerify(r.id, true)} className="text-xs px-2 py-1 rounded bg-dlq-gold text-[#0a1a4f] disabled:opacity-50">Verify</button>
          )}
          <button disabled={busy} onClick={()=>onDelete(r.id)} className="text-xs px-2 py-1 rounded border border-red-400 text-red-300 disabled:opacity-50">Delete</button>
        </div>
      </td>
    </tr>
  )
}
