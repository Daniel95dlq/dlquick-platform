import Stripe from 'stripe'

// Handle missing environment variables gracefully for build time
const getStripeSecretKey = () => {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key && process.env.NODE_ENV === 'production') {
    throw new Error('STRIPE_SECRET_KEY is required in production')
  }
  return key || 'sk_test_placeholder_for_build'
}

export const stripe = new Stripe(getStripeSecretKey(), {
  apiVersion: '2024-06-20' as any,
  typescript: true,
})

export const getStripePublishableKey = () => {
  const key = process.env.STRIPE_PUBLISHABLE_KEY
  if (!key && process.env.NODE_ENV === 'production') {
    throw new Error('STRIPE_PUBLISHABLE_KEY is required in production')
  }
  return key || 'pk_test_placeholder_for_build'
}
