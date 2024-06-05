import {
  createContext,
  useCallback,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { io, Socket } from 'socket.io-client'
import Cookies from 'js-cookie'
import { baseUrl, postRequest, getRequest } from '@/services/api'
import useAuth from '@/hooks/useAuth'
import compareArrays from '@/helpers/compareArrays'

export type Message = {
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

export interface Chat {
  id: string
  members: User[]
  messages: Message[]
  origin: {
    platform: 'facebook' | 'instagram' | 'telegram' | 'web' | 'whatsapp'
    chatId?: string
  }
  timestamps?: string
  __v?: number
}

export type OnlineUser = {
  userId: string
  socketId: string
}

export type ChatContextType = {
  userChats: Chat[]
  isUserChatsLoading: boolean
  userChatsError: string | null
  potentialChats: Chat[] | null
  updateCurrentChat: (chat: Chat) => void
  currentChat: Chat | null
  messages: Message[] | null
  messagesHttp: Message[] | null
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ChatContext = createContext<ChatContextType>({} as any)

type ChatProviderProps = {
  children: ReactNode
}

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [userChats, setUserChats] = useState<Chat[]>([])
  const [isUserChatsLoading, setIsUserChatsLoading] = useState<boolean>(false)
  const [userChatsError, setUserChatsError] = useState<string | null>(null)
  const [potentialChats, setPotentialChats] = useState<Chat[] | null>(null)
  const [currentChat, setCurrentChat] = useState<Chat | null>(null)
  const [isMessagesLoading, setIsMessagesLoading] = useState<boolean>(false)
  const [messageError, setMessageError] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[] | null>(null)
  const [messagesHttp, setMessagesHttp] = useState<Message[] | null>(null)
  // const [textMessageError, setTextMessageError] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState<Message | null>(null)
  const [newMessageHttp, setNewMessageHttp] = useState<Message | null>(null)
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([])
  const [socket, setSocket] = useState<Socket | null>(null)

  const { user } = useAuth()

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SERVER_API as string, {
      auth: {
        token: 'Bearer ' + Cookies.get('token'),
      },
      extraHeaders: {
        'ngrok-skip-browser-warning': '69420',
      },
    })

    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [user])

  useEffect(() => {
    if (socket === null) {
      return
    }

    socket.emit('addNewUser', user?.companyId)
    socket.on('onlineUsers', (users: OnlineUser[]) => {
      setOnlineUsers(users)
    })

    return () => {
      socket.off('onlineUsers')
    }
  }, [socket, user?.companyId])

  useEffect(() => {
    if (!socket) {
      return
    }

    if (currentChat != null) {
      const recipientId = currentChat?.members?.find(
        (member: User) => member?.id !== user?.companyId
      )

      socket.emit('sendMessage', { ...newMessage, recipientId })
    }
  }, [socket, newMessage, currentChat, user?.companyId])

  useEffect(() => {
    if (!socket) {
      return
    }

    if (currentChat != null) {
      const recipientId = currentChat?.members?.find(
        (member: User) => member?.id !== user?.companyId
      )

      socket.emit('sendMessageHttp', { ...newMessageHttp, recipientId })
    }
  }, [socket, newMessageHttp, currentChat, user?.companyId])

  useEffect(() => {
    if (!socket) {
      return
    }

    socket.on('getMessage', (res: Message) => {
      if (currentChat?.id !== res.chatId) {
        return
      }

      setMessages((prev) => [...(prev || []), res])
    })

    return () => {
      socket.off('getMessage')
    }
  }, [socket, currentChat])

  useEffect(() => {
    if (socket === null) {
      return
    }

    socket.on('newUserChat', (client: Chat) => {
      if (userChats != undefined) {
        const isChatCreated = userChats?.some((chat: Chat) =>
          compareArrays(chat?.members, client?.members)
        )

        if (isChatCreated) {
          return
        }
      }

      setUserChats((prev) => [...(prev || []), client])
    })

    return () => {
      socket.off('newUserChat')
    }
  }, [socket, userChats])

  useEffect(() => {
    if (!userChats) {
      return
    }

    const getClients = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await getRequest(`${baseUrl}/api/v1/chat/clients`)
      if (response.error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const value = JSON.stringify(response?.body)
        return setUserChatsError(value)
      }

      const pChats = response?.filter((client: Chat) => {
        let isChatCreated = false

        if (userChats) {
          isChatCreated = userChats?.some((chat) =>
            chat?.members?.some((member) => member?.id === client?.id)
          )
        }

        return !isChatCreated
      })

      setPotentialChats(pChats)
    }

    getClients()
  }, [user, userChats])

  useEffect(() => {
    const getUserChats = async () => {
      if (user?.companyId) {
        setIsUserChatsLoading(true)

        const response = await getRequest(
          `${baseUrl}/api/v1/chat/${user.companyId}`
        )

        if (response.error) {
          setUserChatsError(response.error.toString())
        } else if (Array.isArray(response)) {
          setUserChats(response)
        } else {
          setUserChatsError('Unexpected response format')
        }

        setIsUserChatsLoading(false)
      }
    }

    getUserChats()
  }, [user])

  useEffect(() => {
    const getMessages = async () => {
      setIsMessagesLoading(true)
      setMessageError(null)

      if (currentChat) {
        const response = await getRequest(
          `${baseUrl}/api/v1/chat/message/${currentChat?.id}`
        )

        setIsMessagesLoading(false)

        if (response.error) {
          setMessageError(response.error.toString())
        } else if (Array.isArray(response)) {
          setMessages(response)
        } else {
          setMessageError('Unexpected response format')
        }
      }
    }

    getMessages()
  }, [currentChat])

  const updateCurrentChat = useCallback((chat: Chat) => {
    setCurrentChat(chat)
  }, [])

  const sendTextMessage = useCallback(
    async (
      textMessage: string,
      sender: { companyId: string },
      currentChatId: string,
      setTextMessage: (text: string) => void
    ) => {
      if (textMessage === '') {
        return
      }
      const response = await postRequest(`${baseUrl}/api/v1/chat/message`, {
        text: textMessage,
        senderId: sender.companyId,
        chatId: currentChatId,
      })
      if (response.error) {
        // return setTextMessageError(response.error)
        return console.log(response.error)
      }
      const messageData = response.data as Message
      setNewMessage(messageData)
      setMessages((prev) => [...(prev || []), messageData])
      setTextMessage('')
    },
    []
  )

  useEffect(() => {
    const findClientByEmail = async (email: string) => {
      if (email === '') {
        return;
      }
      
      try {
        const response = await getRequest(`${baseUrl}/api/v1/chat/client/email/${user.email}`);
        if (response.error) {
          console.error('Erro ao buscar cliente por e-mail:', response.error);
          return;
        } 
  
        const clientData = response.data;
        if(!clientData){
          console.log('Email não encontrado');
        }
        return clientData;
      } catch (error) {
        console.error('Erro ao buscar cliente por e-mail:', error);
      }
    };
  
    findClientByEmail(user.email);
  }, [user.email]);

  useEffect(() => {
    const findClientById = async (clientId: string) => {
      if (clientId === '') {
        return;
      }
      
      try {
        const response = await getRequest(`${baseUrl}/api/v1/chat/client/${user.companyId}`);
        if (response.error) {
          console.error('Erro ao buscar cliente por ID:', response.error);
          return;
        } 
        
        const clientData = response.data;
        if(!clientData) {
          console.log("Id do cliente não encontrado");
        }
        return clientData;
      } catch (error) {
        console.error('Erro ao buscar cliente por ID:', error);
      }
    };
  
    findClientById(user.companyId);
  }, [user.companyId]);

  { /*
  useEffect(() => {
    const createChat = async (userId: string, chatId: string) => {
      const response = await postRequest(`${baseUrl}/api/v1/chat`, 
      {
        userId,
        chatId
      }
    )
    
      if (response.error) {
        // setMessageError(response.error.toString())
        return console.log(response.error)
      } 
      if (response){
        return response
      }
    }

    createChat(user.companyId, currentChat?.id)
  }, [])
  */}
  
  useEffect(() => {
    const findChat = async (firstId: string, secondId: string) => {
      if (firstId && secondId === '') {
        return
      }
      const response = await getRequest(`${baseUrl}/api/v1/chat/find/${firstId}/${secondId}`)
      if (response.error) {
        return console.log(response.error)
      } 
      if (response){
        return response.data
      }
    }

    findChat(user.companyId, user.companyId)
  }, [user])

  const sendMessageHttp = async (
    textMessage: string,
    sender: { companyId: string },
    currentChatId: string,
  ) => {
    if (textMessage === '') {
      return;
    }
    try {
      const response = await postRequest(
        `${baseUrl}/api/v1/chat/message/send-message`,
        {
          text: textMessage,
          senderId: sender.companyId,
          chatId: currentChatId
        }
      );
      if (response.error) {
        console.log(response.error);
        return;
      }
  
      const messageData = response.data as Message;
      setNewMessageHttp(messageData);
      setMessagesHttp((prev) => [...(prev || []), messageData]);
      return messageData;
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  }

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        updateCurrentChat,
        currentChat,
        messages,
        messagesHttp,
        isMessagesLoading,
        messageError,
        sendTextMessage,
        sendMessageHttp,
        onlineUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
