import { OrderedList, ListItem, Code, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { PopupSettings } from '../../../settings/PopupSettings'
import { JavascriptPopupSnippet } from '../../Javascript/JavascriptPopupSnippet'
import { TextLink } from '@/components/TextLink'

export const FramerPopupInstructions = () => {
  const [inputValue, setInputValue] = useState<number>();

  return (
    <>
      <OrderedList spacing={4} pl={5}>
        <ListItem>
          Vá para a sessão <Code>Site Settings</Code> {'>'} <Code>General</Code>{' '}
          {'>'} <Code>Custom Code</Code>
        </ListItem>
        <ListItem>
          <Stack spacing={4}>
            <PopupSettings
              onUpdateSettings={(settings) =>
                setInputValue(settings.autoShowDelay)
              }
            />
            <Text>
              Cole isso na entrada:{' '}
              <Code>
                End of {'<'}body{'>'} tag
              </Code>{' '}
            </Text>
            <JavascriptPopupSnippet autoShowDelay={inputValue} />
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