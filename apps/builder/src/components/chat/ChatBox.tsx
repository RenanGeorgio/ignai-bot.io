import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
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
//import useAuth from '@/hooks/useAuth'
import useChat from '@/hooks/useChat'
// import { useFetchRecipient } from '@/hooks/useFetchRecipient'
//import { AuthContextInterface } from '@/contexts/auth/AuthContext'
import Image from 'next/image'
import web from '@/assets/images/web.svg'
// import avatar from '@/assets/images/avatar.png'

import styles from '@/assets/styles/chat.module.css'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'
import { ChatContextType } from '@/contexts/chat/types'
import useUser from '@/hooks/useUser'
import { useFetchRecipient } from '@/hooks/useFetchRecipient'
import { ChatStatus } from '@/contexts/chat/enums'
import { current } from 'immer'

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

  const { user } = useUser()

  const {
    currentChat,
    isMessagesLoading,
    messages,
    sendTextMessage,
  }: ChatContextType = useChat()

  const { recipientUser } = useFetchRecipient(currentChat, user)
  console.log(recipientUser)
  // const isMessagesLoading = false

  useEffect(() => {
    if (!isMessagesLoading && messages) {
      const chatContainer = document.getElementById('chat-container')
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight
      }
    }
  }, [isMessagesLoading, messages])

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

  const handleSendMessage = (
    textMessage: string,
    setTextMessage: React.Dispatch<React.SetStateAction<string>>
  ) => {
    console.log(user, currentChat)
    if (currentChat) {
      sendTextMessage(
        textMessage,
        { companyId: user.companyId },
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

  // if (isMessagesLoading) return <p>Carregando mensagens...</p>

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

  const chatStatus = {
    active: "Ativo",
    finished: "Finalizado",
    archived: "Arquivado"
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

  const getClientAvatar = () => (
    <Image
      className={styles['img-avatar-text']}
      alt="Message Avatar"
      src="/images/blank_avatar.jpg"
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
            src="/images/blank_avatar.jpg"
            width={150}
            height={150}
          />
          <div className={styles['name-time']}>
            <div className={styles['text-wrapper-4']}>
              {`${recipientUser?.name} ${recipientUser?.lastName}`}
            </div>
            <div className={styles['text-wrapper-box-header']}>{currentChat && chatStatus[currentChat.status]}</div>
          </div>
          <div className={styles['chat-icon']}>
            {getChatIcon()}
          </div>
          {/* <div className={styles['name-work']}>
            <span>Fazenda Minas Pro</span>
          </div> */}
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

      <div id="chat-container" className={styles.chat}>
        {messages?.map((message, index: number) => (
          <div
            key={index}
            className={`${styles['message-wrapper']} ${
              message?.senderId === user?.companyId
                ? styles['sent']
                : styles['received']
            }`}
          >
            {message?.senderId === user?.companyId
              ? getTextMessageAvatar()
              : getClientAvatar()}
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
              <span style={{ color: 'black' }}>
                {dayjs(message?.createdAt).format('HH:mm')}
              </span>
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
        value={textMessage}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setTextMessage(e.target.value)
        }
        disabled={currentChat?.status != ChatStatus.ACTIVE}
      />
    </div>
  )
}
