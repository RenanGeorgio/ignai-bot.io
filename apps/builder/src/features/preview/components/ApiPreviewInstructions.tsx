import { CodeEditor } from '@/components/inputs/CodeEditor'
import { TextLink } from '@/components/TextLink'
import { useEditor } from '@/features/editor/providers/EditorProvider'
import { useTypebot } from '@/features/editor/providers/TypebotProvider'
import { parseApiHost } from '@/features/publish/components/embeds/snippetParsers'
import {
  Code,
  ListItem,
  OrderedList,
  Stack,
  StackProps,
  Text,
} from '@chakra-ui/react'

export const ApiPreviewInstructions = (props: StackProps) => {
  const { typebot } = useTypebot();
  const { startPreviewAtGroup } = useEditor();

  const startParamsBody = startPreviewAtGroup
    ? `{
    "startGroupId": "${startPreviewAtGroup}"
}`
    : undefined

  const replyBody = `{
  "message": "Esta é a minha resposta"
}`

  return (
    <Stack spacing={10} overflowY="auto" w="full" {...props}>
      <OrderedList spacing={6} px="1">
        <ListItem>
          Todas as suas requisições precisam ser autenticadas com um token de API.{' '}
          <TextLink href="https://docs.typebot.io/api-reference/authentication">
            Veja instruções
          </TextLink>
          .
        </ListItem>
        <ListItem>
          <Stack>
            <Text>
              Para iniciar um chat, envie uma requisição <Code>POST</Code> para
            </Text>
            <CodeEditor
              isReadOnly
              lang={'shell'}
              value={`${parseApiHost(typebot?.customDomain)}/api/v1/typebots/${
                typebot?.id
              }/preview/startChat`}
            />
            {startPreviewAtGroup && (
              <>
                <Text>com o seguinte corpo JSON:</Text>
                <CodeEditor isReadOnly lang={'json'} value={startParamsBody} />
              </>
            )}
          </Stack>
        </ListItem>
        <ListItem>
          A primeira resposta vai conter <Code>sessionId</Code> que você vai
          precisar para as requisições subsequentes.
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
      <Text fontSize="sm" pl="1">
        Confira a{' '}
        <TextLink
          href="https://docs.typebot.io/api-reference/chat/start-preview-chat"
          isExternal
        >
          API reference
        </TextLink>{' '}
        para mais informações.
      </Text>
    </Stack>
  );
}