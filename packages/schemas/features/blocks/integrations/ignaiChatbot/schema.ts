import { z } from '../../../../zod'
import { ignaiChatbotTasks } from './constants'
import { blockBaseSchema } from '../../shared'
import { IntegrationBlockType } from '../constants'

export const ignaiChatbotOptionsSchema = z.object({
  task: z.enum(ignaiChatbotTasks).optional(),
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

export const ignaiChatbotBlockSchema = blockBaseSchema.merge(
  z.object({
    type: z.enum([IntegrationBlockType.IGNAI_CHATBOT]),
    options: ignaiChatbotOptionsSchema.optional(),
  })
)

export type ignaiChatbotBlock = z.infer<typeof ignaiChatbotBlockSchema>
