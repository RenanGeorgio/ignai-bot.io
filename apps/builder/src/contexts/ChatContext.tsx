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
  id?: string
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
  isMessagesLoading: boolean
  messageError: string | null
  sendTextMessage: (
    textMessage: string,
    sender: { companyId: string },
    currentChatId: string,
    setTextMessage: (text: string) => void
  ) => Promise<void>
  onlineUsers: OnlineUser[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ChatContext = createContext<ChatContextType>({} as any)

type ChatProviderProps = {
  children: ReactNode
}

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [userChats, setUserChats] = useState<Chat[] | undefined>(undefined);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState<boolean>(false);
  const [userChatsError, setUserChatsError] = useState<string | null>(null);
  const [potentialChats, setPotentialChats] = useState<Chat[] | null>(null);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[] | null>(null);
  // const [textMessageError, setTextMessageError] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState<Message | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[] | undefined>(undefined);
  const [socket, setSocket] = useState<Socket | null>(null);

  const { user } = useAuth();

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
      const recipientId = currentChat?.members?.find((member: User) => member?.id !== user?.companyId);

      socket.emit('sendMessage', { ...newMessage, recipientId });
    }
  }, [socket, newMessage, currentChat, user?.companyId])

  useEffect(() => {
    if (!socket) {
      return
    }

    socket.on('getMessage', (res: Message) => {
      if (currentChat?.id !== res.chatId) {
        return
      }

      setMessages((prev) => [...(prev || []), res]);
    })

    return () => {
      socket.off('getMessage')
    }
  }, [socket, currentChat]);

  useEffect(() => {
    if (socket === null) {
      return
    }

    socket.on('newUserChat', (client: Chat) => {
      if (userChats != undefined) {
        const isChatCreated = userChats?.some((chat: Chat) => compareArrays(chat?.members, client?.members));

        if (isChatCreated) {
          return
        }
      }

      setUserChats((prev) => [...(prev || []), client]);
    })

    return () => {
      socket.off('newUserChat')
    }
  }, [socket, userChats]);

  useEffect(() => {
    if (!userChats) {
      return
    }

    const getClients = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await getRequest(`${baseUrl}/api/chat/clients`);

      if (response.error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const value = JSON.stringify(response?.body);
        return setUserChatsError(value);
      }

      const pChats = response?.filter((client: Chat) => {
        let isChatCreated = false

        if (user?.id == client?.id) {
          return false
        }

        if (userChats) {
          isChatCreated = userChats?.some((chat) => chat?.members?.includes(client?.id));
        }

        return !isChatCreated
      });

      setPotentialChats(pChats);
    }

    getClients();
  }, [user, userChats]);

  useEffect(() => {
    const getUserChats = async () => {
      if (user?.companyId) {
        setIsUserChatsLoading(true);

        const response = await getRequest(
          `${baseUrl}/api/chat/${user.companyId}`
        );

        if (response.error) {
          return setUserChatsError(response.error)
        } else {
          setUserChats(response)
        }

        setIsUserChatsLoading(false)
      }
    }

    getUserChats();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      setIsMessagesLoading(true);
      setMessageError(null);

      if (currentChat) {
        const response = await getRequest(
          `${baseUrl}/api/chat/message/${currentChat?.id}`
        );

        setIsMessagesLoading(false);

        if (response.error) {
          setMessageError(response.error);
        }

        setMessages(response);
      }
    }

    getMessages();
  }, [currentChat]);

  const updateCurrentChat = useCallback((chat: Chat) => {
    setCurrentChat(chat);
  }, []);

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

      const response = await postRequest(`${baseUrl}/api/chat/message`, {
        text: textMessage,
        senderId: sender.companyId,
        chatId: currentChatId,
      })

      if (response.error) {
        // return setTextMessageError(response.error)
        return console.log(response.error)
      }

      setNewMessage(response)
      setMessages((prev) => [...(prev || []), response])
      setTextMessage('')
  },[]);

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
        onlineUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}