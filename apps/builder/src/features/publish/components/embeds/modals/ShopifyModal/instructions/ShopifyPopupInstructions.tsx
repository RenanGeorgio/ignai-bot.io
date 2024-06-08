import { OrderedList, ListItem, Stack, Text, Code } from '@chakra-ui/react'
import { useState } from 'react'
import { PopupSettings } from '../../../settings/PopupSettings'
import { JavascriptPopupSnippet } from '../../Javascript/JavascriptPopupSnippet'

export const ShopifyPopupInstructions = () => {
  const [inputValue, setInputValue] = useState<number>();

  return (
    <OrderedList spacing={4} pl={5}>
      <ListItem>
        No painel da sua loja, na pagina <Code>Themes</Code>, click em{' '}
        <Code>Actions {'>'} Edit code</Code>
      </ListItem>
      <ListItem>
        <Stack spacing={4}>
          <PopupSettings
            onUpdateSettings={(settings) =>
              setInputValue(settings.autoShowDelay)
            }
          />
          <Text>
            No arquivo <Code>Layout {'>'} theme.liquid</Code>, cole este código 
            antes do fechamento da tag <Code>{'<head>'}</Code>:
          </Text>
          <JavascriptPopupSnippet autoShowDelay={inputValue} />
        </Stack>
      </ListItem>
    </OrderedList>
  );
}