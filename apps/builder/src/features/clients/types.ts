export interface Client {
  _id: string
  username: string
  name?: string
  email: string
  phone?: string
  address?: string
  status?: string
  isGuest?: boolean
}