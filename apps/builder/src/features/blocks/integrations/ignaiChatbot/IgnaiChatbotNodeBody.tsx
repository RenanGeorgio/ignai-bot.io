import { Text } from '@chakra-ui/react'
import { ignaiChatbotBlock } from '@typebot.io/schemas'

type Props = {
  block: ignaiChatbotBlock
}

export const IgnaiChatbotNodeBody = ({ block }: Props) =>
  block.options?.task === 'Close widget' ? (
    <Text>Close Chatwoot</Text>
  ) : (block.options?.websiteToken?.length ?? 0) === 0 ? (
    <Text color="gray.500">Configure...</Text>
  ) : (
    <Text>Open Ignai Chatbot</Text>
  )
