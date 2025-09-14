"use client"
// Using native anchors instead of next/link to avoid invalid hook call

type Item = { id: string; label: string; extra?: string; subline: string; when: string; status: string }

export default function DashboardQuickPartners({ items }: { items: Item[] }) {
  const toggleAll = (checked: boolean) => {
    document.querySelectorAll('#qp tbody input[type="checkbox"]').forEach((el) => {
      ;(el as HTMLInputElement).checked = checked
    })
  }
  const onBulk = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const status = (new FormData(e.currentTarget).get('status') as string) || ''
    const ids = Array.from(document.querySelectorAll('#qp tbody input[type="checkbox"]'))
      .filter((el) => (el as HTMLInputElement).checked)
      .map((el) => (el as HTMLInputElement).getAttribute('data-id'))
      .filter(Boolean)
    if (!ids.length || !status) return
    await fetch('/api/partners/bulk', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ids, status }) })
    location.href = '/admin/partners?status=' + encodeURIComponent(status)
  }
  return (
    <div className="">
      <form className="px-4 pt-3 pb-2 flex items-center gap-2" onSubmit={onBulk}>
        <span className="text-sm opacity-70">Quick action:</span>
        <select name="status" className="bg-transparent border rounded px-2 py-1 text-sm">
          <option value="REVIEWING">Mark as REVIEWING</option>
          <option value="APPROVED">Mark as APPROVED</option>
          <option value="REJECTED">Mark as REJECTED</option>
        </select>
        <button className="text-sm underline">Apply to selected</button>
      </form>
      <div className="overflow-x-auto" id="qp">
        <table className="min-w-full text-sm">
          <thead className="text-left opacity-70">
            <tr>
              <th className="px-4 py-2"><input type="checkbox" onChange={(e)=>toggleAll(e.currentTarget.checked)} /></th>
              <th className="px-4 py-2">When</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((a)=> (
              <tr key={a.id} className="border-t border-white/10">
                <td className="px-4 py-2"><input type="checkbox" data-id={a.id} /></td>
                <td className="px-4 py-2 whitespace-nowrap">{a.when}</td>
                <td className="px-4 py-2"><a className="underline" href={`/admin/partners/${a.id}`}>{a.label}</a>{a.extra ? <span className="ml-2 text-xs opacity-70">{a.extra}</span> : null}</td>
                <td className="px-4 py-2">{a.subline}</td>
                <td className="px-4 py-2">{a.status}</td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-6 text-sm opacity-70">No partner applications yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
