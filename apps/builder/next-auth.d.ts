import NextAuth, { DefaultProfile } from "next-auth"

declare module "next-auth" {
  
  interface Profile {
    jwt?: string
  } & DefaultProfile
}