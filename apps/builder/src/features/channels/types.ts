type Obj = {
  used: boolean
  id: string
}

type Numbers = {
  id: string
  country?: string
  city?: string
  state?: string
  status: number
}

export type ChannelProps = {
  webObj?: Obj 
  whatsappObj?: Obj 
  igObj?: Obj 
  telegramObj?: Obj 
  emailObj?: Obj 
  msgObj?: Obj 
  hasNumbers: boolean 
  numbersList: Numbers[]
}