import { Context, createContext } from 'react'

export type User = {
  _id: string
  name: string
  email: string
  companyId: string
  full_name: string
}

type SignInData = {
  email: string
  password: string
}

type ErrorResponse = {
  status: number
  message: string
}

export interface AuthContextInterface {
  isAuthenticated: boolean
  user: User
  signIn: (data: SignInData) => Promise<void> | ErrorResponse
  signOut: () => void
}

export const AuthContext: Context<AuthContextInterface> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createContext<AuthContextInterface>({} as any)
