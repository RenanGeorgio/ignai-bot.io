import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    jwt: string
  }

  interface Profile {
    jwt: string
  }
}