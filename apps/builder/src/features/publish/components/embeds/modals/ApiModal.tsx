import { AlertInfo } from '@/components/AlertInfo'
import { CodeEditor } from '@/components/inputs/CodeEditor'
import { TextLink } from '@/components/TextLink'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Heading,
  ModalCloseButton,
  ModalBody,
  OrderedList,
  ListItem,
  Code,
  ModalFooter,
  Text,
  Stack,
} from '@chakra-ui/react'
import { ModalProps } from '../EmbedButton'
import { parseApiHost } from '../snippetParsers/shared'
import { useTypebot } from '@/features/editor/providers/TypebotProvider'

export const ApiModal = ({
  isPublished,
  publicId,
  isOpen,
  onClose,
}: ModalProps): JSX.Element => {
  const { typebot } = useTypebot();

  const replyBody = `{
  "message": "Esta é a minha resposta"
}`

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size="md">API</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody as={Stack} spacing="6">
          {!isPublished && (
            <AlertInfo>Você precisa publicar seu bot primeiro.</AlertInfo>
          )}
          <OrderedList spacing={4} pl="4">
            <ListItem>
              <Stack>
                <Text>
                  Para iniciar um chat, envie uma requisição <Code>POST</Code> para
                </Text>
                <CodeEditor
                  isReadOnly
                  lang={'shell'}
                  value={`${parseApiHost(
                    typebot?.customDomain
                  )}/api/v1/typebots/${publicId}/startChat`}
                />
              </Stack>
            </ListItem>
            <ListItem>
              A primeira resposta vai conter <Code>sessionId</Code> que você
              vai precisar para subsequentes requisições.
            </ListItem>
            <ListItem>
              <Stack>
                <Text>
                  Para enviar respostas, envie uma requisição <Code>POST</Code> para
                </Text>
                <CodeEditor
                  isReadOnly
                  lang={'shell'}
                  value={`${parseApiHost(
                    typebot?.customDomain
                  )}/api/v1/sessions/<ID_FROM_FIRST_RESPONSE>/continueChat`}
                />
                <Text>Com o seguinte corpo JSON:</Text>
                <CodeEditor isReadOnly lang={'json'} value={replyBody} />
                <Text>
                  Substitua <Code>{'<ID_FROM_FIRST_RESPONSE>'}</Code> por{' '}
                  <Code>sessionId</Code>.
                </Text>
              </Stack>
            </ListItem>
          </OrderedList>
          <Text fontSize="sm" colorScheme="gray">
            Confira a{' '}
            <TextLink
              href="https://docs.ignaibot.com/api-reference/chat/start-chat"
              isExternal
            >
              API reference
            </TextLink>{' '}
            para mais informações.
          </Text>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}