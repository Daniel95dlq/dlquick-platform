'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const bookingSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerEmail: z.string().email('Invalid email address'),
  customerPhone: z.string().min(10, 'Phone number must be at least 10 digits'),
  pickupAddress: z.string().min(5, 'Pickup address is required'),
  deliveryAddress: z.string().min(5, 'Delivery address is required'),
  scheduledDate: z.string().min(1, 'Scheduled date is required'),
  notes: z.string().optional(),
})

type BookingForm = z.infer<typeof bookingSchema>

interface BookingDrawerProps {
  isOpen: boolean
  onClose: () => void
  service: {
    id: string
    name: string
    basePrice: number
    priceType: string
  }
}

export default function BookingDrawer({ isOpen, onClose, service }: BookingDrawerProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      customerName: session?.user?.name || '',
      customerEmail: session?.user?.email || '',
    },
  })

  const onSubmit = async (data: BookingForm) => {
    setIsLoading(true)

    try {
      // Create the order first
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId: service.id,
          ...data,
          totalAmount: service.basePrice,
        }),
      })

      if (!orderResponse.ok) {
        throw new Error('Failed to create booking')
      }

      const { order } = await orderResponse.json()

      // Create Stripe checkout session
      const checkoutResponse = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: order.id,
          successUrl: `${window.location.origin}/track?order=${order.orderNumber}&success=true`,
          cancelUrl: `${window.location.origin}/services/${service.id}?cancelled=true`,
        }),
      })

      if (!checkoutResponse.ok) {
        throw new Error('Failed to create payment session')
      }

      const { url } = await checkoutResponse.json()
      
      // Redirect to Stripe checkout
      window.location.href = url
    } catch (error) {
      console.error('Booking error:', error)
      alert('Failed to create booking. Please try again.')
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
          <p className="text-gray-600">Your booking has been submitted. We'll contact you shortly to confirm details.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Book {service.name}</h2>
              <p className="text-gray-600">Starting from £{service.basePrice}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                {...register('customerName')}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
              {errors.customerName && (
                <p className="mt-1 text-sm text-red-600">{errors.customerName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                {...register('customerEmail')}
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
              {errors.customerEmail && (
                <p className="mt-1 text-sm text-red-600">{errors.customerEmail.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              {...register('customerPhone')}
              type="tel"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your phone number"
            />
            {errors.customerPhone && (
              <p className="mt-1 text-sm text-red-600">{errors.customerPhone.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="pickupAddress" className="block text-sm font-medium text-gray-700 mb-2">
              Pickup Address *
            </label>
            <textarea
              {...register('pickupAddress')}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter pickup address"
            />
            {errors.pickupAddress && (
              <p className="mt-1 text-sm text-red-600">{errors.pickupAddress.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700 mb-2">
              Delivery Address *
            </label>
            <textarea
              {...register('deliveryAddress')}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter delivery address"
            />
            {errors.deliveryAddress && (
              <p className="mt-1 text-sm text-red-600">{errors.deliveryAddress.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="scheduledDate" className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Date & Time *
            </label>
            <input
              {...register('scheduledDate')}
              type="datetime-local"
              min={new Date().toISOString().slice(0, 16)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.scheduledDate && (
              <p className="mt-1 text-sm text-red-600">{errors.scheduledDate.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              {...register('notes')}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Any special instructions or requirements"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? 'Redirecting to Payment...' : 'Book Now & Pay'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
