// import { useWorkspace } from '@/features/workspace/WorkspaceProvider'
// import { useUser } from '@/features/account/hooks/useUser'
import { ClientsContext } from './ClientsContext'
import { useEffect, useState, ReactNode } from 'react'
import { api } from '@/services/api'
import { ChatClient } from '@/contexts/chat/types'

export const ClientsProvider = ({ children }: { children: ReactNode }) => {
  // const { jwt } = useUser()

  const [clients, setClients] = useState<ChatClient[] | null>(null)

  useEffect(() => {
    const fetchClients = async () => {
      const res = await api.get('chat/clients')
      if(res.ok){
        const data: ChatClient[] = await res.json()
        setClients(data)
      }
    } 
    fetchClients()
  }, [])

  console.log(clients)

  return (
    // <EventsContext.Provider value={{ conciliationEvent, conciliationLayout }}>
    <ClientsContext.Provider value={{ clients }}>
        {children}
    </ClientsContext.Provider>
  )
}
