import { Context, createContext } from 'react'

type User = {
  name: string
  email: string
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
  user: User | null
  signIn: (data: SignInData) => Promise<void> | ErrorResponse
  signOut: () => void
}

export const AuthContext: Context<AuthContextInterface | undefined> =
  createContext<AuthContextInterface | undefined>(undefined)
