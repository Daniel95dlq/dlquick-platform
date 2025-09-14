"use client"
// Using native anchors instead of next/link to avoid invalid hook call

type Item = { id: string; label: string; subline: string; when: string; status: string }

export default function DashboardQuickQuotes({ items }: { items: Item[] }) {
  const toggleAll = (checked: boolean) => {
    document.querySelectorAll('#qq tbody input[type="checkbox"]').forEach((el) => {
      ;(el as HTMLInputElement).checked = checked
    })
  }
  const onBulk = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const status = (new FormData(e.currentTarget).get('status') as string) || ''
    const ids = Array.from(document.querySelectorAll('#qq tbody input[type="checkbox"]'))
      .filter((el) => (el as HTMLInputElement).checked)
      .map((el) => (el as HTMLInputElement).getAttribute('data-id'))
      .filter(Boolean)
    if (!ids.length || !status) return
    await fetch('/api/quotes/bulk', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ids, status }) })
    location.href = '/admin/quotes?status=' + encodeURIComponent(status)
  }
  return (
    <div className="">
      <form className="px-4 pt-3 pb-2 flex items-center gap-2" onSubmit={onBulk}>
        <span className="text-sm opacity-70">Quick action:</span>
        <select name="status" className="bg-transparent border rounded px-2 py-1 text-sm">
          <option value="CONTACTED">Mark as CONTACTED</option>
          <option value="QUOTED">Mark as QUOTED</option>
          <option value="WON">Mark as WON</option>
          <option value="LOST">Mark as LOST</option>
        </select>
        <button className="text-sm underline">Apply to selected</button>
      </form>
      <div className="overflow-x-auto" id="qq">
        <table className="min-w-full text-sm">
          <thead className="text-left opacity-70">
            <tr>
              <th className="px-4 py-2"><input type="checkbox" onChange={(e)=>toggleAll(e.currentTarget.checked)} /></th>
              <th className="px-4 py-2">When</th>
              <th className="px-4 py-2">Service</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((q)=> (
              <tr key={q.id} className="border-t border-white/10">
                <td className="px-4 py-2"><input type="checkbox" data-id={q.id} /></td>
                <td className="px-4 py-2 whitespace-nowrap">{q.when}</td>
                <td className="px-4 py-2"><a className="underline" href={`/admin/quotes/${q.id}`}>{q.label}</a></td>
                <td className="px-4 py-2">{q.subline}</td>
                <td className="px-4 py-2">{q.status}</td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-6 text-sm opacity-70">No quotes yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
