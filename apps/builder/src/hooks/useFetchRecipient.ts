import { useState, useEffect } from 'react';
import { baseUrl, getRequest } from '@/services/api';

interface Chat {
  members: string[];
}

interface User {
  companyId: string;
}

export const useFetchRecipient = (chat: Chat, user: User) => {
  const [recipientUser, setRecipientUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  // verificar se está renderizando multiplas vezes
  const recipientId = chat?.members?.find((id: string) => id !== user?.companyId);
 
  useEffect(() => {
    const fetchRecipient = async () => {
      if (!recipientId) return;
      try {
        const response = await getRequest(`${baseUrl}/api/chat/client/${recipientId}`);
        if (response.error) {
          setError(response.error);
        } else {
          setRecipientUser(response);
        }
      } catch (error) {
        console.log(error);
        setError("Erro ao buscar o destinatário");
      }
    };
    fetchRecipient();
  }, [recipientId]);
  
  return { recipientUser, error };
}