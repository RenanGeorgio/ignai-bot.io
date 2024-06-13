import { OrderedList, ListItem, Code, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { PopupSettings } from '../../../settings/PopupSettings'
import { JavascriptPopupSnippet } from '../../Javascript/JavascriptPopupSnippet'
import { TextLink } from '@/components/TextLink'

export const WebflowPopupInstructions = () => {
  const [inputValue, setInputValue] = useState<number>();

  return (
    <>
      <OrderedList spacing={4} pl={5}>
        <ListItem>
          Pressione <Code>A</Code> para abrir o painel <Code>Add elements</Code>
        </ListItem>
        <ListItem>
          <Stack spacing={4}>
            <PopupSettings
              onUpdateSettings={(settings) =>
                setInputValue(settings.autoShowDelay)
              }
            />
            <Text>
              Adicione um elemento <Code>Embed</Code> do <Code>components</Code>{' '}
              selecione e copie este codigo:
            </Text>
            <JavascriptPopupSnippet autoShowDelay={inputValue} />
          </Stack>
        </ListItem>
      </OrderedList>
      <Text fontSize="sm" colorScheme="gray" pl="5">
        Confira a{' '}
        <TextLink
          href="https://docs.ignaibot.com/deploy/web/webflow#popup"
          isExternal
        >
          Documentação do Webflow incorporado
        </TextLink>{' '}
        para mais opções.
      </Text>
    </>
  );
}