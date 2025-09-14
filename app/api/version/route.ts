import { NextResponse } from 'next/server'

export function GET() {
  const v = process.env.VERCEL_GIT_COMMIT_SHA || process.env.VERCEL_DEPLOYMENT_ID || 'local'
  const br = process.env.VERCEL_GIT_COMMIT_REF || process.env.VERCEL_BRANCH || 'local'
  const builtAt = new Date().toISOString()
  return NextResponse.json({ version: v, branch: br, builtAt })
}
