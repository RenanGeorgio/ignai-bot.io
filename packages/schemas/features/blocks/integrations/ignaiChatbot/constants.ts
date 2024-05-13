import { ignaiChatbotBlock } from './schema'

export const ignaiChatbotTasks = ['Show widget', 'Close widget'] as const

export const defaultIgnaiChatbotOptions = {
  task: 'Show widget',
  baseUrl: 'https://app.chatwoot.com',
} as const satisfies ignaiChatbotBlock['options']
