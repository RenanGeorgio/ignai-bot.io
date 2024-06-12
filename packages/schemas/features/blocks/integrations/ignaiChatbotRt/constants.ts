import { ignaiChatbotRtBlock } from './schema'

export const ignaiChatbotRtTasks = ['Show widget', 'Close widget'] as const

export const defaultIgnaiChatbotRtOptions = {
  task: 'Show widget',
  baseUrl: 'https://chatbot.ignai.com.br',
} as const satisfies ignaiChatbotRtBlock['options']
