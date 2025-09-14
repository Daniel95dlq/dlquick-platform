import { NextRequest, NextResponse } from 'next/server'
import { services } from '../../../lib/services-data'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get('q') || '').toLowerCase().trim()
  const filters = (searchParams.get('filters') || '').split(',').filter(Boolean)
  const results = services.filter((s) => {
    const matchQ = !q || s.title.toLowerCase().includes(q) || s.summary.toLowerCase().includes(q) || s.sections.overview.toLowerCase().includes(q)
    const matchTags = filters.length === 0 || (s.tags && filters.every((t) => s.tags!.includes(t)))
    return matchQ && matchTags
  }).slice(0, 50)
  return NextResponse.json({ q, filters, results })
}
