/* Create an ADMIN user quickly: email from ADMIN_EMAIL or default */
const { PrismaClient, UserRole } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@dlquick.co.uk'
  const name = process.env.ADMIN_NAME || 'DLQuick Admin'
  const user = await prisma.user.upsert({
    where: { email },
    update: { role: UserRole.ADMIN, name },
    create: { email, name, role: UserRole.ADMIN },
  })
  console.log('Admin user ensured:', { email: user.email, role: user.role })
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})
