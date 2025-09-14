import { NextRequest, NextResponse } from 'next/server'

// Block access to sensitive PDFs anywhere they might be hosted
const BLOCKED_PDFS = [
  '/DLQuick_Web_Platform_and_Legal_Pack.pdf',
  '/DLQuick_Web_Platform_and_Extra_Bomb_Pack.pdf',
  '/DLQuick_Mega_Master_Developer_Pack.pdf',
  '/DLQuick_Mega_Master_Developer_Pack_WITH_WIREFRAMES.pdf',
  '/DLQuick_Project_Summary_for_Developers.pdf',
]

export function middleware(req: NextRequest) {
  const p = req.nextUrl.pathname
  if (BLOCKED_PDFS.includes(p)) {
    return new NextResponse('Not Found', { status: 404 })
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/DLQuick_Web_Platform_and_Legal_Pack.pdf',
    '/DLQuick_Web_Platform_and_Extra_Bomb_Pack.pdf',
    '/DLQuick_Mega_Master_Developer_Pack.pdf',
    '/DLQuick_Mega_Master_Developer_Pack_WITH_WIREFRAMES.pdf',
    '/DLQuick_Project_Summary_for_Developers.pdf',
  ],
}
