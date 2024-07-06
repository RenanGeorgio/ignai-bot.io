import React, { createContext, useCallback, useEffect, useState, ReactNode } from 'react'
import { io, Socket } from 'socket.io-client'
import Cookies from 'js-cookie'
import { baseUrl, api } from '@/services/api'
//import useAuth from '@/hooks/useAuth'
//import compareArrays from '@/helpers/compareArrays'
import { Chat, ChatClient, ChatContextType, Message, OnlineUser } from './types'
import useUser from '@/hooks/useUser'
import compareArrays from '@/helpers/compareArrays'
import { ChatStatus } from './enums'

// import useUser from '@/hooks/useAuth'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ChatContext = createContext<ChatContextType>({} as any)

type ChatProviderProps = {
  children: ReactNode
}

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [userChats, setUserChats] = useState<Chat[]>([])
  const [isUserChatsLoading, setIsUserChatsLoading] = useState<boolean>(false)
  const [userChatsError, setUserChatsError] = useState<string | null>(null)
  const [potentialChats, setPotentialChats] = useState<ChatClient[] | null>(
    null
  )
  const [currentChat, setCurrentChat] = useState<Chat | null>(null)
  const [isMessagesLoading, setIsMessagesLoading] = useState<boolean>(false)
  const [messageError, setMessageError] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[] | null>(null)
  // const [textMessageError, setTextMessageError] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState<Message | null>(null)
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([])
  const [socket, setSocket] = useState<Socket | null>(null)

  const { user } = useUser()

  useEffect(() => {
    const newSocket = io(baseUrl as string, {
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

    socket.emit('addNewUser', { userId: user?.companyId, platform: 'typebot' })
    socket.on('onlineUsers', (users: OnlineUser[]) => {
      setOnlineUsers(users)
    })

    return () => {
      socket.off('onlineUsers')
    }
  }, [socket, user?.companyId])

  useEffect(() => {
    if (!socket) return
    console.log()
    const recipientId = currentChat?.members?.find(
      (id: string) => id !== user?.companyId
    )

    if (!recipientId) return
    console.log("send message event")
    socket.emit('sendMessage', { ...newMessage, recipientId })
    setNewMessage(null)
  }, [newMessage, socket])

  useEffect(() => {
    if (!socket) return
    socket.on('getMessage', (res: Message) => {
      if (currentChat?._id !== res.chatId) return
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
        const isChatCreated = userChats?.some(
          (chat: Chat) =>
            compareArrays(chat?.members, client?.members) &&
            client.status === chat.status // testar
        );

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
      const response = await api.get(`chat/clients`)
      if (!response.ok) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        console.log(response)
        // const value = JSON.stringify(response?.body)
        // return setUserChatsError(value)
      }

      const data: ChatClient[] | Chat[] = await response.json()

      const pChats = data?.filter((client) => {
        let isChatCreated = false;

        if (!(user?._id === client?._id)) {
          return false
        }

        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            const members_: string[] = chat.members;
            return members_?.includes(client._id) && chat.status === ChatStatus.ACTIVE;
          });
        }
        return !isChatCreated
      })
      console.log(pChats)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      setPotentialChats(pChats);
    }

    getClients()
  }, [user, userChats])

  useEffect(() => {
    const getUserChats = async () => {
      if (user?.companyId) {
        setIsUserChatsLoading(true)
        const response = await api.get(`chat/${user.companyId}`)
        if (!response.ok) {
          return setUserChatsError('error') // verificar dps
        }
        const data: Chat[] = await response.json()
        setUserChats(data)
      }
    }

    getUserChats()
  }, [user, onlineUsers]) // adicionei para que atualize a listagem dos chats quando alguem deconectar, é necessário verificar

  useEffect(() => {
    const getMessages = async () => {
      setIsMessagesLoading(true)
      setMessageError(null)
      if (currentChat) {
        const response = await api.get(`chat/message/${currentChat._id}`)
        setIsMessagesLoading(false)
        const data: Message[] = await response.json()
        if (!response.ok && 'message' in data) {
          setMessageError(data.message as string)
        }

        setMessages(data)
      }
    }
    getMessages()
  }, [currentChat])

  const updateCurrentChat = useCallback((chat: Chat) => {
    setCurrentChat(chat)
  }, [])

  useEffect(() => {
    if(!socket) return;

    socket?.on("disconnectClient", () => {
      console.log("evento de desconexão")
      if(currentChat){
        // setCurrentChat((prev: Chat) => ({
        //   ...prev,
        //   status: ChatStatus.FINISHED,
        // }))
      }
    })
  }, [socket, currentChat])

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
      const response = await api.post(`chat/message`, {
        json: {
          text: textMessage,
          senderId: sender.companyId,
          chatId: currentChatId,
        },
      })
      const data: Message = await response.json()
      if (!response.ok) {
        // return setTextMessageError(response.error)
        return console.log(response)
      }

      setNewMessage(data)
      setMessages((prev) => (prev ? [...prev, data] : [data]))
      setTextMessage('')
    },
    []
  )

  // useEffect(() => {
  //   const findClientByEmail = async (email: string) => {
  //     if (email === '') {
  //       return
  //     }

  //     try {
  //       const response = await getRequest(
  //         `${baseUrl}/api/v1/chat/client/email/${user.email}`
  //       )

  //       if (response.error) {
  //         console.error('Erro ao buscar cliente por e-mail:', response.error)
  //         return
  //       }

  //       const clientData = response.data
  //       console.log('Cliente encontrado por e-mail:', clientData)
  //       return clientData
  //     } catch (error) {
  //       console.error('Erro ao buscar cliente por e-mail:', error)
  //     }
  //   }

  //   findClientByEmail(user?.email)
  // }, [user])

  // useEffect(() => {
  //   const findClientById = async (clientId: string) => {
  //     if (clientId === '') {
  //       return
  //     }

  //     try {
  //       const response = await getRequest(
  //         `${baseUrl}/api/v1/chat/client/${'1'}`
  //       )

  //       if (response.error) {
  //         console.error('Erro ao buscar cliente por ID:', response.error)
  //         return
  //       }

  //       const clientData = response.data
  //       console.log('Cliente encontrado por ID:', clientData)
  //       return clientData
  //     } catch (error) {
  //       console.error('Erro ao buscar cliente por ID:', error)
  //     }
  //   }

  //   findClientById('1')
  // }, [user])

  {
    /*
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
  */
  }

  // useEffect(() => {
  //   const findChat = async (firstId: string, secondId: string) => {
  //     if (firstId && secondId === '') {
  //       return
  //     }
  //     const response = await getRequest(
  //       `${baseUrl}/api/v1/chat/find/${firstId}/${secondId}`
  //     )

  //     if (response.error) {
  //       // setMessageError(response.error.toString())
  //       return console.log(response.error)
  //     }
  //     if (response) {
  //       return response
  //     }
  //   }

  //   // findChat(user.companyId, user.companyId)
  // }, [user])

  // const sendMessageHttp = async (
  //   textMessage: string,
  //   sender: { companyId: string },
  //   currentChatId: string
  // ) => {
  //   if (textMessage === '') {
  //     return
  //   }
  //   try {
  //     const token = Cookies.get('token')
  //     if (!token) {
  //       throw new Error('Token de autenticação não encontrado')
  //     }

  //     const response = await postRequest(
  //       `${baseUrl}/api/v1/chat/message/send-message`,
  //       {
  //         text: textMessage,
  //         senderId: sender.companyId,
  //         chatId: currentChatId,
  //       }
  //     )

  //     if (response.error) {
  //       console.log(response.error)
  //       return
  //     }

  //     const messageData = response.data as Message
  //     setNewMessage(messageData)
  //     setMessages((prev) => [...(prev || []), messageData])
  //     return messageData
  //   } catch (error) {
  //     console.error('Erro ao enviar mensagem:', error)
  //   }
  // }

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
        isMessagesLoading,
        messageError,
        sendTextMessage,
        // sendMessageHttp,
        onlineUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
