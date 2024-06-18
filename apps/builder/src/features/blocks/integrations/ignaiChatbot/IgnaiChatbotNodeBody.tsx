import { Text } from '@chakra-ui/react'
import { ignaiChatbotRtBlock } from '@typebot.io/schemas'

type Props = {
  block: ignaiChatbotRtBlock
}

export const IgnaiChatbotNodeBody = ({ block }: Props) => {
  console.log(block.options?.baseUrl?.length, block.options, 'test')
  return block.options?.task === 'Close widget' ? (
    <Text>Fechar Ignai Chat</Text>
  ) : (block.options?.baseUrl?.length ?? 0) === 0 ? (
    <Text color="gray.500">Configure...</Text>
  ) : (
    <Text>Abrir Ignai Chatbot RT </Text>
  )
}
