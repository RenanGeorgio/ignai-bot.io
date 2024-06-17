import { useState, useEffect } from 'react'
import { api } from '@/services/api'

interface Chat {
  members: string[]
}

interface User {
  companyId: string
}

interface RecipientUser {
  _id: string
  name: string
  lastName?: string
  email: string
}

interface ApiResponseSuccess {
  _id: string
  name: string
  email: string
}

export const useFetchRecipient = (chat: Chat | null, user: User) => {
  const [recipientUser, setRecipientUser] = useState<RecipientUser | null>(null)
  const [error, setError] = useState<string | null>(null)

  const recipientId = chat?.members?.find(
    (id: string) => id !== user?.companyId
  )

  useEffect(() => {
    const fetchRecipient = async () => {
      if (!recipientId) return
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const response = await api(
          `api/v1/chat/client/${recipientId}`
        )
        if (!response.ok) {
          setError(response.statusText)
        } else {
          const data: ApiResponseSuccess = await response.json()
          setRecipientUser(data)
        }
      } catch (error) {
        console.log(error)
        setError('Erro ao buscar o destinatário')
      }
    }
    fetchRecipient()
  }, [recipientId])

  return { recipientUser, error }
}
