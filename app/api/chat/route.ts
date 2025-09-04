import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'
import * as z from 'zod'

const chatSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
  sessionId: z.string(),
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional(),
})

// AI Assistant personality and context
const SYSTEM_PROMPT = `You are the DLQuick AI Assistant, representing a premium delivery and logistics company in the UK. Your personality is professional yet approachable, like a helpful business assistant who knows the company inside and out.

Key facts about DLQuick:
- Premium on-demand delivery service operating across the UK
- Services include: groceries, parcels, business deliveries, removals, pet transport, personal shopping, and trades
- Known for reliability, speed, and professional service
- Uses both branded vehicles and trusted partner network
- Offers real-time tracking and customer support
- Base prices start from competitive rates with transparent pricing
- Operating hours: Available 24/7 for most services
- Coverage: Major UK cities with expanding network

Your role:
- Help customers understand our services and pricing
- Assist with booking questions and order tracking
- Provide professional, helpful responses
- Be concise but informative
- If you don't know specific information, direct them to contact support
- Always maintain a professional, business-like tone
- Use British English spelling and terms

Keep responses under 150 words unless complex information is needed.`

async function generateAIResponse(message: string, context: any[]): Promise<string> {
  // For this demo, I'll provide rule-based responses
  // In production, you would integrate with OpenAI or another AI service
  
  const lowercaseMessage = message.toLowerCase()
  
  // Service inquiries
  if (lowercaseMessage.includes('service') || lowercaseMessage.includes('what do you')) {
    return `DLQuick offers comprehensive delivery and logistics services across the UK:

🚚 **Core Services:**
• Grocery & shopping deliveries
• Parcel & package delivery
• Business logistics
• Home removals & moves
• Pet transport services
• Personal shopping assistance
• Trade & professional services

We operate 24/7 with real-time tracking, professional drivers, and competitive pricing. What specific service interests you?`
  }
  
  // Pricing inquiries
  if (lowercaseMessage.includes('price') || lowercaseMessage.includes('cost') || lowercaseMessage.includes('how much')) {
    return `Our pricing is transparent and competitive:

💷 **Starting Rates:**
• Local deliveries from £8
• Cross-city from £15
• Groceries & shopping from £12
• Business services from £20
• Removals quoted individually

Final price depends on distance, service type, and timing. You'll see the exact cost before booking. Would you like a quote for a specific service?`
  }
  
  // Tracking inquiries
  if (lowercaseMessage.includes('track') || lowercaseMessage.includes('order') || lowercaseMessage.includes('delivery')) {
    return `To track your order:

📱 **Tracking Options:**
• Use our tracking page with your order ID (format: DLQ-2024-XXXXXX)
• Check your email for tracking links
• Monitor real-time GPS updates
• Contact your assigned driver directly

If you can't find your order ID or need assistance, please share your booking email or phone number and I'll help locate your delivery.`
  }
  
  // Hours inquiries
  if (lowercaseMessage.includes('hour') || lowercaseMessage.includes('open') || lowercaseMessage.includes('time')) {
    return `DLQuick operates around the clock:

⏰ **Service Hours:**
• Standard deliveries: 7 AM - 10 PM daily
• Express services: 24/7 availability
• Emergency deliveries: Anytime
• Customer support: 8 AM - 8 PM

Weekend and bank holiday services available. Some specialist services may have specific hours. What type of delivery do you need?`
  }
  
  // Booking inquiries
  if (lowercaseMessage.includes('book') || lowercaseMessage.includes('schedule') || lowercaseMessage.includes('arrange')) {
    return `Booking with DLQuick is simple:

📝 **How to Book:**
1. Choose your service from our website
2. Enter pickup & delivery details
3. Select your preferred time slot
4. Review pricing and confirm
5. Pay securely online
6. Receive instant confirmation

You can book immediately or schedule up to 30 days ahead. Need help with a specific booking?`
  }
  
  // Cancel inquiries
  if (lowercaseMessage.includes('cancel') || lowercaseMessage.includes('change') || lowercaseMessage.includes('modify')) {
    return `We understand plans change:

✅ **Cancellation Policy:**
• Free cancellation up to 1 hour before pickup
• Partial refund for cancellations within 1 hour
• No charge for weather-related cancellations
• Modifications possible until driver dispatch

To cancel or modify, use your order confirmation email link or contact our support team with your order ID.`
  }
  
  // Coverage area
  if (lowercaseMessage.includes('area') || lowercaseMessage.includes('location') || lowercaseMessage.includes('cover')) {
    return `DLQuick serves major UK locations:

🗺️ **Coverage Areas:**
• London & Greater London (full coverage)
• Birmingham, Manchester, Liverpool
• Edinburgh, Glasgow, Cardiff
• Bristol, Leeds, Sheffield
• And expanding to more cities

For areas outside our core network, we partner with trusted local providers. Enter your postcode on our website to check availability and pricing.`
  }
  
  // Default helpful response
  return `Hello! I'm here to help with any questions about DLQuick services.

I can assist with:
• Service information & pricing
• Booking assistance
• Order tracking
• Coverage areas
• Cancellation policies

What would you like to know? You can also browse our services on the website or contact our support team for personalised assistance.`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, sessionId, messages = [] } = chatSchema.parse(body)

    // Save user message to database
    await prisma.chatMessage.create({
      data: {
        sessionId,
        role: 'USER',
        content: message,
      },
    })

    // Generate AI response
    const aiResponse = await generateAIResponse(message, messages)

    // Save AI response to database
    await prisma.chatMessage.create({
      data: {
        sessionId,
        role: 'ASSISTANT',
        content: aiResponse,
      },
    })

    return NextResponse.json({
      message: aiResponse,
      sessionId,
    })
  } catch (error) {
    console.error('Chat API error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    )
  }
}
