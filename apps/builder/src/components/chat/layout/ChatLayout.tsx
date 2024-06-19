import React, { useMemo, useState } from 'react'
import { ChatBox } from '../ChatBox'
import { LeftMenu } from '../LeftMenu'
import { UserChat } from '../UserChat'
// import useAuth from '@/hooks/useAuth'
import useChat from '@/hooks/useChat'

import styles from './ChatLayout.module.css'
import { Chat } from '@/contexts/chat/types'

export default function ChatLayout() {
  const [showAddTicket, setShowAddTicket] = useState(false)
  const toggleAddTicket = () => {
    setShowAddTicket(!showAddTicket)
  }

  const { userChats, updateCurrentChat } = useChat()
  
  const sortedChats = useMemo(() => 
    userChats.sort((a, b) => {
      let dateA = new Date(a.createdAt).getTime();
      let dateB = new Date(b.createdAt).getTime();
      if (dateA < dateB) {
          return 1;
      }
      if (dateA > dateB) {
          return -1;
      }
      return 0;
  }),
  [userChats])

  return (
    <div className={styles['wrapper-box']}>
      <div className={styles['wrapp']}>
        <div className={styles['side']}>
          <LeftMenu onAddTicketClick={toggleAddTicket}>
            <div className={styles['heading-2']}>
              <div className={styles['text-wrapper-client']}>Clientes</div>
            </div>
            <div className={styles['div-content']}>
              {sortedChats?.map((chat: Chat, index: number) => (
                <div
                  key={index}
                  onClick={() => {
                    updateCurrentChat(chat)
                  }}
                >
                  <UserChat chat={chat} />
                </div>
              ))}
            </div>
          </LeftMenu>
        </div>
        <div className={styles['content']}>
          <ChatBox
            toggleAddTicket={showAddTicket}
            setShowAddTicket={setShowAddTicket}
          />
        </div>
      </div>
    </div>
  )
}
