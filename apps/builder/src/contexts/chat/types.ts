import { Platforms } from "./enums"

export interface Message {
  _id: string
  senderId: string
  chatId?: string
  text: string
  timestamp?: number
  createdAt?: string
  updatedAt?: string
}

export interface User {
  id: string
  name: string
  email: string
  companyId?: string
}

export interface ChatClient {
  _id: string
  name: string
  lastName?: string
  username: string
  createdAt: string
  updatedAt: string
}

export type Chat = {
  _id: string
  members: string[]
  messages: Message[]
  origin: {
    platform: Platforms
    chatId?: string
  }
  timestamps?: string
  __v?: number
}

export interface OnlineUser  {
  userId: string
  socketId: string
}

export type ChatContextType = {
  userChats: Chat[]
  isUserChatsLoading: boolean
  userChatsError: string | null
  potentialChats: ChatClient[] | null
  updateCurrentChat: (chat: Chat) => void
  currentChat: Chat | null
  messages: Message[] | null
  isMessagesLoading: boolean
  messageError: string | null
  sendTextMessage: (
    textMessage: string,
    sender: { companyId: string },
    currentChatId: string,
    setTextMessage: (text: string) => void
  ) => Promise<void>
  sendMessageHttp: (
    textMessage: string,
    sender: { companyId: string },
    currentChatId: string
  ) => void
  onlineUsers: OnlineUser[]
}