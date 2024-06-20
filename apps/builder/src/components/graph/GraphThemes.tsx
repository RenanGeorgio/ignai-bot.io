import React from 'react'
import {
  PercentageIcon,
  ChatIcon,
  UsersIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  TelegramIcon,
  WhatsAppIcon,
  InstagramIcon
} from '@/components/icons'
import styles from '@/assets/styles/graph.module.css'
import useChat from '@/hooks/useChat';

interface GraphThemesProps {
  month?: string;
}

const GraphThemes: React.FC<GraphThemesProps> = () => {
  const { userChats } = useChat()

  const totalChats = userChats.length
  const activeChats = userChats.filter(chat => chat.status === 'active').length
  const finishedChats = userChats.filter(chat => chat.status === 'finished').length

  const telegramChats = userChats.filter(chat => chat.origin.platform === 'telegram').length
  const whatsappChats = userChats.filter(chat => chat.origin.platform === 'whatsapp').length
  const instagramChats = userChats.filter(chat => chat.origin.platform === 'instagram').length

  const calculatePercentage = (part: number, total: number) => {
    return total > 0 ? ((part / total) * 100).toFixed(2) : '0.00'
  }

  return (
    <div className={styles['graph-container-themes']}>
      <h3 className={styles['graph-title']}>Dados Gerais dos Chats</h3>
      <h4 className={styles['graph-subtitle']}>12% de aumento nesse mês</h4>
      <div className={styles['menu-icon-themes']}>&#8942;</div>
      <div className={styles['data-row-themes']}>
        <div className={styles['data-item']}>
          <div className={styles['graph-themes-icon']}>
            <PercentageIcon />
          </div>
          <span className={styles['data-text']}>Total de Chats</span>
          <div className={styles['percentage-container']}>
            <ChevronUpIcon />
            <h4>{calculatePercentage(totalChats, totalChats)}%</h4>
          </div>
          <span className={styles['data-number']}>{totalChats}</span>
        </div>
      </div>
      <div className={styles['data-row-themes']}>
        <div className={styles['data-item']}>
          <div className={styles['graph-themes-icon']}>
            <TelegramIcon />
          </div>
          <span className={styles['data-text']}>Chats no Telegram</span>
          <div className={styles['percentage-container']}>
            <ChevronUpIcon />
            <h4>{calculatePercentage(telegramChats, totalChats)}%</h4>
          </div>
          <span className={styles['data-number']}>{telegramChats}</span>
        </div>
      </div>
      <div className={styles['data-row-themes']}>
        <div className={styles['data-item']}>
          <div className={styles['graph-themes-icon']}>
            <WhatsAppIcon />
          </div>
          <span className={styles['data-text']}>Chats no Whatsapp</span>
          <div className={styles['percentage-container']}>
            <ChevronDownIcon />
            <h4>{calculatePercentage(whatsappChats, totalChats)}%</h4>
          </div>
          <span className={styles['data-number']}>{whatsappChats}</span>
        </div>
      </div>
      <div className={styles['data-row-themes']}>
        <div className={styles['data-item']}>
          <div className={styles['graph-themes-icon']}>
            <InstagramIcon />
          </div>
          <span className={styles['data-text']}>Chats no Instagram</span>
          <div className={styles['percentage-container']}>
            <ChevronUpIcon />
            <h4>{calculatePercentage(instagramChats, totalChats)}%</h4>
          </div>
          <span className={styles['data-number']}>{instagramChats}</span>
        </div>
      </div>
      <div className={styles['data-row-themes-2']}>
        <div className={styles['data-item']}>
          <div className={styles['graph-themes-icon']}>
            <ChatIcon />
          </div>
          <span className={styles['data-text']}>Chats Ativos</span>
          <div className={styles['percentage-container']}>
            <ChevronDownIcon />
            <h4>{calculatePercentage(activeChats, totalChats)}%</h4>
          </div>
          <span className={styles['data-number']}>{activeChats}</span>
        </div>
      </div>
      <div className={styles['data-row-themes-2']}>
        <div className={styles['data-item']}>
          <div className={styles['graph-themes-icon']}>
            <UsersIcon />
          </div>
          <span className={styles['data-text']}>Chats Finalizados</span>
          <div className={styles['percentage-container']}>
            <ChevronUpIcon />
            <h4>{calculatePercentage(finishedChats, totalChats)}%</h4>
          </div>
          <span className={styles['data-number']}>{finishedChats}</span>
        </div>
      </div>
    </div>
  )
}

export default GraphThemes
