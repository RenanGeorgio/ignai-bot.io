import { useTypebot } from '@/features/editor/providers/TypebotProvider'
import { OrderedList, ListItem, Code, Stack, Text } from '@chakra-ui/react'
import { BubbleProps } from '@typebot.io/nextjs'
import { useState } from 'react'
import { BubbleSettings } from '../../../settings/BubbleSettings/BubbleSettings'
import { parseDefaultBubbleTheme } from '../../Javascript/instructions/JavascriptBubbleInstructions'
import { JavascriptBubbleSnippet } from '../../Javascript/JavascriptBubbleSnippet'
import { TextLink } from '@/components/TextLink'

export const FramerBubbleInstructions = () => {
  const { typebot } = useTypebot();

  const [theme, setTheme] = useState<BubbleProps['theme']>(parseDefaultBubbleTheme(typebot));
  const [previewMessage, setPreviewMessage] = useState<BubbleProps['previewMessage']>();

  return (
    <>
      <OrderedList spacing={4} pl={5}>
        <ListItem>
          Vá para a sessão <Code>Site Settings</Code> {'>'} <Code>General</Code>{' '}
          {'>'} <Code>Custom Code</Code>
        </ListItem>
        <ListItem>
          <Stack spacing={4}>
            <BubbleSettings
              previewMessage={previewMessage}
              defaultPreviewMessageAvatar={
                typebot?.theme.chat?.hostAvatar?.url ?? ''
              }
              theme={theme}
              onPreviewMessageChange={setPreviewMessage}
              onThemeChange={setTheme}
            />
            <Text>
              Cole isso na entrada:{' '}
              <Code>
                End of {'<'}body{'>'} tag
              </Code>{' '}
            </Text>
            <JavascriptBubbleSnippet
              theme={theme}
              previewMessage={previewMessage}
            />
          </Stack>
        </ListItem>
      </OrderedList>
      <Text fontSize="sm" colorScheme="gray" pl="5">
        Confira a{' '}
        <TextLink
          href="https://www.framer.com/academy/lessons/custom-code"
          isExternal
        >
          Documentação do Code Framer personalizado
        </TextLink>{' '}
        para mais informações.
      </Text>
    </>
  );
}