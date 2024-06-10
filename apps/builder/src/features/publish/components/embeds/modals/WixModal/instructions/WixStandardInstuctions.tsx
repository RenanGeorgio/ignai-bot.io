import { OrderedList, ListItem, Code, Stack, Text } from '@chakra-ui/react'
import { JavascriptStandardSnippet } from '../../Javascript/JavascriptStandardSnippet'

export const WixStandardInstructions = () => {
  return (
    <OrderedList spacing={4} pl={5}>
      <ListItem>
        No Editor de Websites do Wix:
        <Code>
          Add {'>'} Embed Code {'>'} Embed HTML
        </Code>
      </ListItem>
      <ListItem>
        <Stack spacing={4}>
          <Text>
            Click no <Code>Enter code</Code> para copiar este codigo:
          </Text>
          <JavascriptStandardSnippet widthLabel="100%" heightLabel="100%" />
        </Stack>
      </ListItem>
    </OrderedList>
  );
}