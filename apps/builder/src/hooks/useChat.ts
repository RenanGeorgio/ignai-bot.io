import { useContext } from 'react';
import { ChatContext } from '@/contexts/chat/ChatContext';

const useChat = () => {
    return useContext(ChatContext);
}

export default useChat;