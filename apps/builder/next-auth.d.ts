import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    jwt: string
  }

  interface Session {
    user: {
      jwt: string
    }
  }
}