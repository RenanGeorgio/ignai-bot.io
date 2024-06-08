import { OrderedList, ListItem, Code, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { PopupSettings } from '../../../settings/PopupSettings'
import { JavascriptPopupSnippet } from '../../Javascript/JavascriptPopupSnippet'

export const WixPopupInstructions = () => {
  const [inputValue, setInputValue] = useState<number>();

  return (
    <OrderedList spacing={4} pl={5}>
      <ListItem>
        Vá em <Code>Settings</Code> no seu dashboard do Wix
      </ListItem>
      <ListItem>
        Click em <Code>Custom Code</Code> na sessão <Code>Advanced</Code>
      </ListItem>
      <ListItem>
        Click <Code>+ Add Custom Code</Code> no canto superior direito.
      </ListItem>
      <ListItem>
        <Stack spacing={4}>
          <PopupSettings
            onUpdateSettings={(settings) =>
              setInputValue(settings.autoShowDelay)
            }
          />
          <Text>Cole este trecho na caixa de código:</Text>
          <JavascriptPopupSnippet autoShowDelay={inputValue} />
        </Stack>
      </ListItem>
      <ListItem>
        Selecione &quot;Body - start&quot; em <Code>Place Code in</Code>
      </ListItem>
      <ListItem>Clique em Aplicar</ListItem>
    </OrderedList>
  );
}