import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface User {
    jwt: string
  }

  interface Session {
    user: {
      jwt: string
    } & DefaultSession["user"]
  }

  interface Profile {
    jwt: string
  }
}