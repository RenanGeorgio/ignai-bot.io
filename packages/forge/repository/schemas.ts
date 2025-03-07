// Do not edit this file manually
import { anthropicBlock } from '@typebot.io/anthropic-block'
import { anthropicBlockSchema } from '@typebot.io/anthropic-block/schemas'
import { calComBlock } from '@typebot.io/cal-com-block'
import { calComBlockSchema } from '@typebot.io/cal-com-block/schemas'
import { chatNodeBlock } from '@typebot.io/chat-node-block'
import { chatNodeBlockSchema } from '@typebot.io/chat-node-block/schemas'
import { difyAiBlock } from '@typebot.io/dify-ai-block'
import { difyAiBlockSchema } from '@typebot.io/dify-ai-block/schemas'
import { elevenlabsBlock } from '@typebot.io/elevenlabs-block'
import { elevenlabsBlockSchema } from '@typebot.io/elevenlabs-block/schemas'
import { mistralBlock } from '@typebot.io/mistral-block'
import { mistralBlockSchema } from '@typebot.io/mistral-block/schemas'
import { openRouterBlock } from '@typebot.io/open-router-block'
import { openRouterBlockSchema } from '@typebot.io/open-router-block/schemas'
import { openAIBlock } from '@typebot.io/openai-block'
import { openAIBlockSchema } from '@typebot.io/openai-block/schemas'
import { qrCodeBlock } from '@typebot.io/qrcode-block'
import { qrCodeBlockSchema } from '@typebot.io/qrcode-block/schemas'
import { togetherAiBlock } from '@typebot.io/together-ai-block'
import { togetherAiBlockSchema } from '@typebot.io/together-ai-block/schemas'
import { zemanticAiBlock } from '@typebot.io/zemantic-ai-block'
import { zemanticAiBlockSchema } from '@typebot.io/zemantic-ai-block/schemas'
import { ignaiChatbotBlock } from '@typebot.io/ignai-chatbot-block'
import { ignaiChatbotBlockSchema } from '@typebot.io/ignai-chatbot-block/schemas'

export const forgedBlockSchemas = {
  [openAIBlock.id]: openAIBlockSchema,
  [zemanticAiBlock.id]: zemanticAiBlockSchema,
  [calComBlock.id]: calComBlockSchema,
  [chatNodeBlock.id]: chatNodeBlockSchema,
  [qrCodeBlock.id]: qrCodeBlockSchema,
  [difyAiBlock.id]: difyAiBlockSchema,
  [mistralBlock.id]: mistralBlockSchema,
  [elevenlabsBlock.id]: elevenlabsBlockSchema,
  [anthropicBlock.id]: anthropicBlockSchema,
  [togetherAiBlock.id]: togetherAiBlockSchema,
  [openRouterBlock.id]: openRouterBlockSchema,
  [ignaiChatbotBlock.id]: ignaiChatbotBlockSchema,
}
