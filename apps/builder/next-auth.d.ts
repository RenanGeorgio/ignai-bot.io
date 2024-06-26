import NextAuth from "next-auth/index"

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