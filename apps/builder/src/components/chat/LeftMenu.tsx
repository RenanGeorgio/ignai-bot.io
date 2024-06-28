import React, { useState, ReactNode, MouseEventHandler } from 'react'
import { Phone, TelegramIcon } from '@/components/icons'

import styles from '@/assets/styles/leftmenu.module.css'

interface LeftMenuProps {
  onAddTicketClick: MouseEventHandler<HTMLButtonElement>
  children: ReactNode
}

export const LeftMenu: React.FC<LeftMenuProps> = ({
  onAddTicketClick,
  children,
}) => {
  // const [openPage, setOpenPage] = useState(false)
  // const [openTicket, setOpenTicket] = useState(false)
  const [showAddTicket, setShowAddTicket] = useState(false)

  const toggleAddTicket: MouseEventHandler<HTMLButtonElement> = (event) => {
    setShowAddTicket(!showAddTicket)
    onAddTicketClick(event)
  }

  return (
    <div className={styles['left-menu']}>
      <header className={styles['header-left']}>
        <img
          className={styles['icon-instance-node']}
          src="https://i.pravatar.cc/150?img=3"
          alt="Avatar-14"
        />
        <input
          className={styles.instance}
          placeholder="Pesquisar contato..."
        />
      </header>

      <div className={styles['div-3']}>
        <div className={styles.heading}>
          <button
            style={{ width: '100%' }}
            className={
              showAddTicket ? styles.blueButtonTicket : styles.grayButtonTicket
            }
            onClick={toggleAddTicket}
          >
            Adicionar&nbsp;&nbsp;ticket
            <span className={styles.phoneCall}>
              <Phone />
            </span>
          </button>
        </div>
        <div className={styles['div-content-clients']}>
          {children}
        </div>
      </div>

      <div className={styles['div-3']}>
        <div className={styles['heading-3']}>
          <div className={styles['text-wrapper-3']}>Leads</div>
        </div>
        <div className={styles['div-content']}>
          <div className={styles.listLeftLead}>
            <div className={styles.avatarWithName}>
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="Avatar"
                className={styles['avatar-client']}
                height={'50px'}
                width={'50px'}
              />
              <div className={styles['text-2']}>
                <div className={styles['imgTextWrapper']}>
                  <img
                    className="img-2"
                    alt="World wide web PNG"
                    src="https://c.animaapp.com/5uY2Jqwr/img/world-wide-web-png-pic-1-1@2x.png"
                    height={'24px'}
                    width={'24px'}
                  />
                  <div className={styles['text-wrapper-10']}>Lead 04432</div>
                </div>
                <div className={styles['text-wrapper-9']}>
                  Pedido de catálogo
                </div>
              </div>
            </div>
          </div>
          <div className={styles.listLeftLead}>
            <div className={styles.avatarWithName}>
              <img
                src="https://i.pravatar.cc/150?img=11"
                alt="Avatar"
                className={styles['avatar-client']}
                height={'50px'}
                width={'50px'}
              />
              <div className={styles['text-2']}>
                <div className={styles['imgTextWrapper']}>
                  <TelegramIcon />
                  <div className={styles['text-wrapper-10']}>Lead 04433</div>
                </div>
                <div className={styles['text-wrapper-9']}>Orçamento</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
