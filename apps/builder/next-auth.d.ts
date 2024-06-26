import "next-auth"

declare module "next-auth" {
  
  interface Profile {
    jwt?: string
  }
}