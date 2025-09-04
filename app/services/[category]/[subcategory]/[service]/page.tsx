import { notFound } from 'next/navigation'
import { prisma } from '@/src/lib/prisma'
import ServiceDetailClient from '@/components/ServiceDetailClient'

type Params = {
  category: string
  subcategory: string
  service: string
}

export async function generateStaticParams() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    include: {
      subcategory: {
        include: {
          category: true,
        },
      },
    },
  })

  return services.map((service) => ({
    category: service.subcategory.category.slug,
    subcategory: service.subcategory.slug,
    service: service.slug,
  }))
}

export async function generateMetadata({ params }: { params: Params }) {
  const service = await prisma.service.findFirst({
    where: {
      slug: params.service,
      subcategory: {
        slug: params.subcategory,
        category: {
          slug: params.category,
        },
      },
    },
    include: {
      subcategory: {
        include: {
          category: true,
        },
      },
    },
  })

  if (!service) {
    return {
      title: 'Service not found • DLQuick',
    }
  }

  const title = `${service.name} • DLQuick Services`
  const description = service.shortDesc || service.description || `Professional ${service.name} services`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ['/og.jpg'],
    },
  }
}

export default async function ServiceDetailPage({ params }: { params: Params }) {
  const service = await prisma.service.findFirst({
    where: {
      slug: params.service,
      isActive: true,
      subcategory: {
        slug: params.subcategory,
        isActive: true,
        category: {
          slug: params.category,
          isActive: true,
        },
      },
    },
    include: {
      subcategory: {
        include: {
          category: true,
        },
      },
    },
  })

  if (!service) {
    notFound()
  }

  return <ServiceDetailClient service={service} />
}
