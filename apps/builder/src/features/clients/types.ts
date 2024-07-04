export interface Client {
  _id: string
  username: string
  name?: string
  email?: string
  phone?: string
  address?: {
    street?: string
    number?: string | number
    neighborhood?: string
    city?: string
    state?: string
  }
  status?: string
  isGuest?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any
}