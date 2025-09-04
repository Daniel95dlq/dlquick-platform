import { PrismaClient, UserRole } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@dlquick.co.uk'
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

  const hashedPassword = await bcrypt.hash(adminPassword, 12)

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'DLQuick Admin',
      password: hashedPassword,
      role: UserRole.MASTER_ADMIN,
    },
  })

  console.log('✅ Admin user created:', { email: admin.email, role: admin.role })

  // Create sample categories and services based on our existing data
  const deliveryCategory = await prisma.category.upsert({
    where: { slug: 'delivery' },
    update: {},
    create: {
      name: 'Delivery Services',
      slug: 'delivery',
      description: 'Fast and reliable delivery solutions',
      pillar: 'delivery',
      order: 1,
    },
  })

  const businessCategory = await prisma.category.upsert({
    where: { slug: 'business' },
    update: {},
    create: {
      name: 'Business Services',
      slug: 'business',
      description: 'Professional business solutions',
      pillar: 'business',
      order: 2,
    },
  })

  const personalCategory = await prisma.category.upsert({
    where: { slug: 'personal' },
    update: {},
    create: {
      name: 'Personal Services',
      slug: 'personal',
      description: 'Personal assistance and services',
      pillar: 'personal',
      order: 3,
    },
  })

  // Create subcategories
  const quickDelivery = await prisma.subcategory.upsert({
    where: { categoryId_slug: { categoryId: deliveryCategory.id, slug: 'quick-delivery' } },
    update: {},
    create: {
      name: 'Quick Delivery',
      slug: 'quick-delivery',
      description: 'Same-day delivery services',
      categoryId: deliveryCategory.id,
      order: 1,
    },
  })

  const marketplaceDelivery = await prisma.subcategory.upsert({
    where: { categoryId_slug: { categoryId: deliveryCategory.id, slug: 'marketplace-delivery' } },
    update: {},
    create: {
      name: 'Marketplace Delivery',
      slug: 'marketplace-delivery',
      description: 'E-commerce and marketplace deliveries',
      categoryId: deliveryCategory.id,
      order: 2,
    },
  })

  // Create sample services
  await prisma.service.upsert({
    where: { subcategoryId_slug: { subcategoryId: quickDelivery.id, slug: 'same-day-delivery' } },
    update: {},
    create: {
      name: 'Same Day Delivery',
      slug: 'same-day-delivery',
      description: 'Fast same-day delivery service across London',
      shortDesc: 'Get your items delivered within hours',
      basePrice: 15.99,
      priceType: 'FIXED',
      timeEstimate: '2-6 hours',
      features: JSON.stringify(['Same-day delivery', 'Real-time tracking', 'Secure handling']),
      isActive: true,
      isPopular: true,
      subcategoryId: quickDelivery.id,
      order: 1,
    },
  })

  await prisma.service.upsert({
    where: { subcategoryId_slug: { subcategoryId: marketplaceDelivery.id, slug: 'ebay-collection' } },
    update: {},
    create: {
      name: 'eBay Collection & Delivery',
      slug: 'ebay-collection',
      description: 'Professional eBay item collection and delivery service',
      shortDesc: 'Collect and deliver your eBay purchases',
      basePrice: 25.00,
      priceType: 'FIXED',
      timeEstimate: '1-3 days',
      features: JSON.stringify(['Professional collection', 'Secure packaging', 'Insurance included']),
      isActive: true,
      subcategoryId: marketplaceDelivery.id,
      order: 1,
    },
  })

  console.log('✅ Sample categories and services created')
  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
