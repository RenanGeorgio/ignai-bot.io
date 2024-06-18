import { z } from '../../../../zod'
import { ignaiChatbotRtTasks } from './constants'
import { blockBaseSchema } from '../../shared'
import { IntegrationBlockType } from '../constants'

export const ignaiChatbotRtOptionsSchema = z.object({
  task: z.enum(ignaiChatbotRtTasks).optional(),
  baseUrl: z.string().optional(), 
  websiteToken: z.string().optional(),
  user: z
    .object({
      id: z.string().optional(),
      email: z.string().optional(),
      name: z.string().optional(),
      avatarUrl: z.string().optional(),
      phoneNumber: z.string().optional(),
    })
    .optional(),
})

export const ignaiChatbotRtBlockSchema = blockBaseSchema.merge(
  z.object({
    type: z.enum([IntegrationBlockType.IGNAI_CHATBOT_RT]),
    options: ignaiChatbotRtOptionsSchema.optional(),
  })
)

export type ignaiChatbotRtBlock = z.infer<typeof ignaiChatbotRtBlockSchema>