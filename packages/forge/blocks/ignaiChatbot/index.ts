import { createBlock } from '@typebot.io/forge'
import { IgnaiChatbotLogo } from './logo'
import { auth } from './auth'
import { sendMessage } from './actions/chatConnection'

export const ignaiChatbotBlock = createBlock({
  id: 'ignai-chatbot',
  name: 'Ignai Chatbot',
  tags: [],
  LightLogo: IgnaiChatbotLogo,
  // auth,
  actions: [sendMessage],
})
