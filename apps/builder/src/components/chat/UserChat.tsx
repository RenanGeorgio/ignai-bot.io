import React from 'react'
import useChat from '@/hooks/useChat'
// import { useFetchRecipient } from '@/hooks/useFetchRecipient'
import {
  FaceBookIcon,
  InstagramIcon,
  TelegramIcon,
  WhatsAppIcon,
} from '@/components/icons'
// import avatar from '../../assets/images/avatar.png'
import web from '@/assets/images/web.svg'
import styles from '@/assets/styles/leftmenu.module.css'
import { Chat, OnlineUser } from '@/contexts/chat/types'
import { useFetchRecipient } from '@/hooks/useFetchRecipient'
import useUser from '@/hooks/useUser'
import { Spinner } from '@chakra-ui/react'
import Image from 'next/image'
import { ChatStatus } from '@/contexts/chat/enums'


interface UserChatProps {
  chat: Chat
  // user: User
}

export const UserChat: React.FC<UserChatProps> = ({ chat }) => {
  // export const UserChat: React.FC<UserChatProps> = ({ chat, user }) => {
  const { user } = useUser();
  const { recipientUser, error } = useFetchRecipient(chat, user)

  const { onlineUsers } = useChat()

  if(recipientUser === null && !error) {
    return <Spinner style={{ marginLeft: 5}}/>
  }
  
  if(error){
    return;
  }

  const isOnline = onlineUsers?.some(
    (onlineUser: OnlineUser) =>
      onlineUser.userId === recipientUser?._id &&
      chat.status === ChatStatus.ACTIVE
  );

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
  console.log(recipientUser)
  return (
    <div className={styles.messageBubble}>
      <div className={styles.avatarWithName}>
        <div className={styles.imageName}>
          <Image
            src={'https://i.pravatar.cc/150?img=3'}
            alt="Avatar"
            className={styles['avatar-client']}
            width={50}
            height={50}
          />
          <div
            className={styles['name']}
          >{`${recipientUser?.name} ${recipientUser?.lastName ?? ""}`}</div>
        </div>
        <div className={isOnline ? styles.online : styles.offline}></div>
      </div>
      <div className={styles.messageDetails}>
        {/* <div className={styles.companyName}>Fazenda Minas Pro</div> */}
        {/* <div className="time">1 Minute</div> */}
      </div>
      <div className={styles.messageLogo}>{getChatIcon()}</div>
    </div>
  )
}