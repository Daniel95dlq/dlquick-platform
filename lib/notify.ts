import { sendMail } from './mailer'

type Message = { title: string; lines: string[] }

export async function notifyOps(msg: Message) {
  const title = msg.title
  const text = msg.lines.join('\n')

  // Email
  const ops = process.env.OPERATIONS_EMAIL || process.env.SMTP_FROM
  if (ops) {
    await sendMail({ to: ops, subject: `[DLQuick] ${title}`, text })
  }

  // Slack webhook
  const webhook = process.env.SLACK_WEBHOOK_URL
  if (webhook) {
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: `*${title}*\n${text}` }),
      })
    } catch (e) {
      console.error('Slack notify error', e)
    }
  }
}
