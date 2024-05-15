import { ignaiChatbotRtBlock } from './schema'

export const ignaiChatbotRtTasks = ['Show widget', 'Close widget'] as const

export const defaultIgnaiChatbotRtOptions = {
  task: 'Show widget',
  baseUrl: 'https://app.chatwoot.com',
} as const satisfies ignaiChatbotRtBlock['options']
