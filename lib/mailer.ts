import nodemailer from 'nodemailer'

type Mail = { to: string | string[]; subject: string; text?: string; html?: string }

function getTransport() {
  const host = process.env.SMTP_HOST
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !port || !user || !pass) return null

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })
}

export async function sendMail(mail: Mail) {
  const from = process.env.SMTP_FROM || 'DLQuick <no-reply@dlquick.co.uk>'
  const transport = getTransport()
  if (!transport) return { ok: false, skipped: true, reason: 'Mailer not configured' }
  try {
    const info = await transport.sendMail({ from, ...mail })
    return { ok: true, id: info.messageId }
  } catch (e) {
    console.error('sendMail error', e)
    return { ok: false, error: 'send_failed' }
  }
}
