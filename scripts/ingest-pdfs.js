#!/usr/bin/env node
// Extract text from PDFs passed as CLI args into docs/ingested/*.md
const fs = require('fs')
const fsp = fs.promises
const path = require('path')
const pdf = require('pdf-parse')

async function ensureDir(dir) {
  await fsp.mkdir(dir, { recursive: true })
}

function mdEscape(s) {
  return s.replace(/\u0000/g, '').replace(/\t/g, '  ').replace(/\r/g, '')
}

async function processOne(file) {
  const buf = await fsp.readFile(file)
  const data = await pdf(buf)
  const base = path.basename(file, path.extname(file))
  const outDir = path.join(process.cwd(), 'docs', 'ingested')
  await ensureDir(outDir)
  const outPath = path.join(outDir, base + '.md')
  const header = `# Ingested: ${base}\n\n- Source: ${file}\n- Pages: ${data.numpages}\n- Info: ${JSON.stringify(data.info || {}, null, 2)}\n\n---\n\n`
  await fsp.writeFile(outPath, header + mdEscape(data.text || ''), 'utf8')
  console.log('Wrote', outPath)
}

async function main() {
  const files = process.argv.slice(2)
  if (files.length === 0) {
    console.error('Usage: node scripts/ingest-pdfs.js <file1.pdf> [file2.pdf ...]')
    process.exit(1)
  }
  for (const f of files) {
    try {
      await processOne(f)
    } catch (e) {
      console.error('Failed for', f, e.message)
      process.exitCode = 1
    }
  }
}

main()
