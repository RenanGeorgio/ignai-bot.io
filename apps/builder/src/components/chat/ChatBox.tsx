import React, { Dispatch, SetStateAction, useState } from 'react'
import { IconButton } from '@chakra-ui/react'
import {
  Phone,
  Search,
  Video,
  DotsVertical,
  FaceBookIcon,
  InstagramIcon,
  TelegramIcon,
  WhatsAppIcon,
} from '@/components/icons'
import TextEnter from './TextEnter'
import AddTicket from './AddTicket'
import useAuth from '@/hooks/useAuth'
import useChat from '@/hooks/useChat'
// import { useFetchRecipient } from '@/hooks/useFetchRecipient'
import { AuthContextInterface } from '@/contexts/AuthContext'
import Image from 'next/image'
import web from '@/assets/images/web.svg'
// import avatar from '@/assets/images/avatar.png'

import styles from '@/assets/styles/chat.module.css'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'
import { ChatContextType } from '@/contexts/ChatContext'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

interface Props {
  toggleAddTicket: boolean
  setShowAddTicket: Dispatch<SetStateAction<boolean>>
}

export const ChatBox: React.FC<Props> = ({
  toggleAddTicket,
  setShowAddTicket,
}): React.ReactElement => {
  const [textMessage, setTextMessage] = useState<string>('')

  const { user }: AuthContextInterface = useAuth()

  const { sendTextMessage }: ChatContextType = useChat()

  // const { currentChat, isMessagesLoading, messages, sendTextMessage } =
  //   useChat()

  // const { recipientUser } = useFetchRecipient(currentChat, user)

  const currentChat = {
    origin: {
      platform: 'telegram',
      chatId: '1053301824',
    },
    _id: '662683ef2a815f652638d615',
    members: ['661d1e55582bfd030342607f', '1'],
    timestamps: '2024-04-22T15:36:15.885Z',
    __v: 0,
  }

  const recipientUser = {
    _id: '661d1e55582bfd030342607f',
    name: 'Samuel',
    lastName: ' ',
    email: 'samuel@email.com',
  }

  const messages = [
    {
      _id: '662683f62a815f652638d617',
      chatId: '662683ef2a815f652638d615',
      senderId: '661d1e55582bfd030342607f',
      text: 'olá',
      createdAt: '2024-04-22T15:36:22.788Z',
      updatedAt: '2024-04-22T15:36:22.789Z',
      __v: 0,
    },
    {
      _id: '66268528718c33cd84bfca5c',
      chatId: '662683ef2a815f652638d615',
      senderId: '661d1e55582bfd030342607f',
      text: 'oi',
      createdAt: '2024-04-22T15:41:28.215Z',
      updatedAt: '2024-04-22T15:41:28.215Z',
      __v: 0,
    },
    {
      _id: '66268555718c33cd84bfca5e',
      chatId: '662683ef2a815f652638d615',
      senderId: '661d1e55582bfd030342607f',
      text: 'oi',
      createdAt: '2024-04-22T15:42:13.181Z',
      updatedAt: '2024-04-22T15:42:13.181Z',
      __v: 0,
    },
    {
      _id: '66268684bc89acbc5c55a631',
      chatId: '662683ef2a815f652638d615',
      senderId: '661d1e55582bfd030342607f',
      text: '/finalizar',
      createdAt: '2024-04-22T15:47:16.912Z',
      updatedAt: '2024-04-22T15:47:16.912Z',
      __v: 0,
    },
    {
      _id: '66268686bc89acbc5c55a633',
      chatId: '662683ef2a815f652638d615',
      senderId: '661d1e55582bfd030342607f',
      text: 'oi',
      createdAt: '2024-04-22T15:47:18.873Z',
      updatedAt: '2024-04-22T15:47:18.873Z',
      __v: 0,
    },
  ]

  const isMessagesLoading = false

  if (!recipientUser)
    return (
      <div className={styles.headerBoxChat}>
        <div className={styles['initial-info']}>
          <div className={styles['name-time']}></div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.rightContent}>
            <IconButton className={styles['img-4']} aria-label="Phone">
              <Phone />
            </IconButton>
            <IconButton className={styles['img-4']} aria-label="Video">
              <Video />
            </IconButton>
            <IconButton className={styles['img-4']} aria-label="Pesquisa">
              <Search />
            </IconButton>
            <IconButton className={styles['img-4']} aria-label="Dots">
              <DotsVertical />
            </IconButton>
          </div>
        </div>
      </div>
    )

  const handleSendMessage = () => {
    if (user) {
      sendTextMessage(
        textMessage,
        { companyId: user?.companyId },
        currentChat._id,
        setTextMessage
      )
    }
  }

  const handleFileUpload = (file: File) => {
    console.log('Arquivo recebido em Treatment:', file)
  }

  const handleFileUploadPhoto = (file: File) => {
    console.log('Arquivo recebido em Treatment:', file)
  }

  if (isMessagesLoading) return <p>Carregando mensagens...</p>

  const origin = currentChat?.origin.platform

  const getChatIcon = () => {
    switch (origin) {
      case 'facebook':
        return <FaceBookIcon />
      case 'instagram':
        return <InstagramIcon />
      case 'telegram':
        return <TelegramIcon />
      case 'web':
        return <Image src={web} alt="Web Icon" width={30} height={30} />
      case 'whatsapp':
        return <WhatsAppIcon />
      default:
        return 'https://c.animaapp.com/5uY2Jqwr/img/whatsapp-33-1-1@2x.png'
    }
  }

  const getTextMessageAvatar = () => (
    <Image
      className={styles['img-avatar-message']}
      alt="Text Avatar"
      src="https://i.pravatar.cc/150?img=3"
      width={150}
      height={150}
    />
  )

  const getMessageAvatar = () => (
    <Image
      className={styles['img-avatar-text']}
      alt="Message Avatar"
      src="https://i.pravatar.cc/150?img=3"
      width={150}
      height={150}
    />
  )

  return (
    <div className={styles.containerchat}>
      <div className={styles.headerBoxChat}>
        <div className={styles['initial-info']}>
          <Image
            className={styles['img-avatar']}
            alt="Avatar"
            src="https://i.pravatar.cc/150?img=3"
            width={150}
            height={150}
          />
          <div className={styles['name-time']}>
            <div className={styles['text-wrapper-4']}>
              {`${recipientUser?.name} ${recipientUser?.lastName}`}
            </div>
            <div className={styles['text-wrapper-box-header']}>1 Minute</div>
          </div>
          {getChatIcon()}
          <div className={styles['name-work']}>
            <div>Fazenda Minas Pro</div>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.rightContent}>
            <IconButton className={styles['img-4']} aria-label="Phone">
              <Phone />
            </IconButton>
            <IconButton className={styles['img-4']} aria-label="Video">
              <Video />
            </IconButton>
            <IconButton className={styles['img-4']} aria-label="Pesquisa">
              <Search />
            </IconButton>
            <IconButton className={styles['img-4']} aria-label="Dots">
              <DotsVertical />
            </IconButton>
          </div>
        </div>
      </div>

      <div className={styles.chat}>
        {messages?.map((message, index: number) => (
          <div key={index} className={styles['message-wrapper']}>
            {message?.senderId === user?.companyId
              ? getTextMessageAvatar()
              : getMessageAvatar()}
            <div
              className={`${
                message?.senderId === user?.companyId
                  ? styles['text']
                  : styles['message']
              }`}
            >
              <p>{message?.text}</p>
            </div>
            <div
              className={`message-time ${
                message?.senderId === user?.companyId
                  ? styles['time-left']
                  : styles['time-right']
              }`}
            >
              <span>{dayjs(message?.createdAt).format('HH:mm')}</span>
            </div>
          </div>
        ))}
      </div>
      {toggleAddTicket ? (
        <AddTicket
          onUploadFile={handleFileUpload}
          onSetShow={() => setShowAddTicket((prev) => !prev)}
        />
      ) : (
        ''
      )}
      <TextEnter
        onUploadFilePhoto={handleFileUploadPhoto}
        onSendMessage={handleSendMessage}
      />
    </div>
  )
}
