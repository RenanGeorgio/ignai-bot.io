import EmailCustomizer from '@/features/emailTemplate/EmailCustomizer'
import { Flex, Box } from '@chakra-ui/react'

export default function Page() {
  return (
    <Flex direction="column" align="center" justify="center">
      <Box width="100%" maxWidth="800px">
        <EmailCustomizer />
      </Box>
    </Flex>
  )
}
