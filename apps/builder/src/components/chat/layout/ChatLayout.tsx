import React, { useState } from 'react'
import { ChatBox } from '../ChatBox'
import { LeftMenu } from '../LeftMenu'
import { UserChat } from '../UserChat'
// import useAuth from '@/hooks/useAuth'
import useChat from '@/hooks/useChat'

import styles from './ChatLayout.module.css'
import { Chat } from '@/contexts/ChatContext'

export default function LayoutChat() {
  const [showAddTicket, setShowAddTicket] = useState(false)
  const toggleAddTicket = () => {
    setShowAddTicket(!showAddTicket)
  }

  /*
  const { user } = useAuth();

  const user = {
    _id: '65bbe0359f84da3af601f373',
    name: 'Samuel',
    company: 'Sam`s Company',
    companyId: '1',
    email: 'samuelmarques96@live.com',
  }
  */

  const { userChats, updateCurrentChat } = useChat()

  return (
    <div className={styles['wrapper-box']}>
      <div className={styles['wrapp']}>
        <div className={styles['side']}>
          <LeftMenu onAddTicketClick={toggleAddTicket}>
            <div className={styles['heading-2']}>
              <div className={styles['text-wrapper-3']}>Clientes</div>
            </div>
            <div className={styles['div-content']}>
              {userChats?.map((chat: Chat, index: number) => (
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
