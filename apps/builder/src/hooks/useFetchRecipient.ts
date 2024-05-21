import { useState, useEffect } from 'react'
import { baseUrl, getRequest } from '@/services/api'

interface Chat {
  members: string[]
}

interface User {
  companyId: string
}

interface RecipientUser {
  id: string
  name: string
  email: string
}

interface ApiResponseSuccess {
  id: string
  name: string
  email: string
}

interface ApiResponseError {
  error: string
}

type ApiResponse = ApiResponseSuccess | ApiResponseError

export const useFetchRecipient = (chat: Chat, user: User) => {
  const [recipientUser, setRecipientUser] = useState<RecipientUser | null>(null)
  const [error, setError] = useState<string | null>(null)

  const recipientId = chat?.members?.find(
    (id: string) => id !== user?.companyId
  )

  useEffect(() => {
    const fetchRecipient = async () => {
      if (!recipientId) return
      try {
        const response: ApiResponse = <unknown>(
          await getRequest(`${baseUrl}/api/chat/client/${recipientId}`)
        )
        if ('error' in response) {
          setError(response.error)
        } else {
          setRecipientUser(response as RecipientUser)
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
