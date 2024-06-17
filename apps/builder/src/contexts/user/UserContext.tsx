import { Context, createContext } from 'react'

export type User = {
  _id: string
  name: string
  email: string
  company: string
  companyId: string
}

interface UserContextInterface {
  // isAuthenticated: boolean
  user: User
  // setUser: (user: User | null) => void
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UserContext: Context<UserContextInterface> = createContext({} as any);