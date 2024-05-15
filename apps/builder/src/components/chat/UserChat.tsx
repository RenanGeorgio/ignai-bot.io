import React from 'react'
import useChat from '@/hooks/useChat'
import { useFetchRecipient } from '@/hooks/useFetchRecipient'
import {
  FaceBookIcon,
  InstagramIcon,
  TelegramIcon,
  WhatsAppIcon,
} from '@/components/icons'
import avatar from '../../assets/images/avatar.png'
import web from '@/assets/images/web.svg'

import styles from '@/assets/styles/leftmenu.module.css'

type Message = {
  id: string
  senderId: string
  text: string
  timestamp: number
}

type User = {
  name: string
  email: string
}

type OnlineUser = {
  userId: string
  socketId: string
}

type Chat = {
  id: string
  members: User[]
  messages: Message[]
  origin: {
    platform: 'facebook' | 'instagram' | 'telegram' | 'web' | 'whatsapp'
  }
}

interface UserChatProps {
  chat: Chat
  user: User
}

export const UserChat: React.FC<UserChatProps> = ({ chat, user }) => {
  // const { recipientUser, error } = useFetchRecipient(chat, user)
  const recipientUser = {
    _id: '661d1e55582bfd030342607f',
    name: 'Samuel',
    lastName: ' ',
    email: 'samuel@email.com',
    createdAt: '2024-04-15T12:32:21.440Z',
    updatedAt: '2024-04-15T12:32:21.440Z',
    __v: 0,
  }

  const { onlineUsers } = useChat()

  const isOnline = onlineUsers?.some(
    (onlineUser: OnlineUser) => onlineUser.userId === recipientUser?._id
  )

  const origin = chat?.origin.platform

  const getChatIcon = () => {
    switch (origin) {
      case 'facebook':
        return <FaceBookIcon />
      case 'instagram':
        return <InstagramIcon />
      case 'telegram':
        return <TelegramIcon />
      case 'web':
        return (
          <img
            src={web}
            style={{ width: '30px', height: '30px' }}
            alt="Web Icon"
          />
        )
      case 'whatsapp':
        return <WhatsAppIcon />
      default:
        return <WhatsAppIcon />
    }
  }

  return (
    <div className={styles.messageBubble}>
      <div className={styles.avatarWithName}>
        <div className={styles.imageName}>
          <img
            src={'https://i.pravatar.cc/150?img=3'}
            alt="Avatar"
            className={styles['avatar-client']}
          />
          <div
            className={styles['name']}
          >{`${recipientUser?.name} ${recipientUser?.lastName}`}</div>
        </div>
        <div className={isOnline ? styles.online : styles.offline}></div>
      </div>
      <div className={styles.messageDetails}>
        <div className={styles.companyName}>Fazenda Minas Pro</div>
        {/* <div className="time">1 Minute</div> */}
      </div>
      <div className={styles.messageLogo}>{getChatIcon()}</div>
    </div>
  )
}
