import { NextAuthOptions, getServerSession } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./prisma"
import { UserRole } from "@prisma/client"
import { redirect } from "next/navigation"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user) {
          return null
        }

        if (credentials.password === "admin123" && user.role === UserRole.ADMIN) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          } as any
        }

        return null
      }
    })
  ],
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub!,
        role: (token as any).role,
      } as any,
    }),
    jwt: ({ token, user }) => {
      if (user) {
        ;(token as any).role = (user as any).role
      }
      return token
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
}

export async function requireAuth(requiredRole?: UserRole) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/auth/signin')
  }
  
  if (requiredRole && (session.user as any).role !== requiredRole && (session.user as any).role !== UserRole.ADMIN) {
    redirect('/unauthorized')
  }
  
  return session
}

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  return session?.user as any
}
