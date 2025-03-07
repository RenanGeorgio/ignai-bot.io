import { StackProps, HStack, useColorModeValue } from '@chakra-ui/react'
import { BlockIcon } from './BlockIcon'
import { BlockLabel } from './BlockLabel'
import { BlockV6 } from '@typebot.io/schemas'

export const BlockCardOverlay = ({
  type,
  ...props
}: StackProps & { type: BlockV6['type'] }) => {
  return (
    <HStack
      borderWidth="1px"
      rounded="lg"
      cursor={'grabbing'}
      w="147px"
      transition="none"
      pointerEvents="none"
      px="4"
      py="2"
      borderColor={useColorModeValue('gray.200', 'gray.800')}
      bgColor={useColorModeValue('gray.50', 'gray.850')}
      shadow="xl"
      zIndex={2}
      {...props}
    >
      <BlockIcon type={type} />
      <BlockLabel type={type} />
    </HStack>
  )
}