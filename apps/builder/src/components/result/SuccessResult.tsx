import { Box, Heading, Text } from '@chakra-ui/react'
import { CheckIcon } from '../icons'
// import { CheckCircleIcon } from '@chakra-ui/icons'

export default function SuccessResult({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <Box textAlign="center" py={10} px={6}>
      <CheckIcon boxSize={'50px'} color={'green.500'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        {title}
      </Heading>
      <Text color={'gray.500'}>{description}</Text>
    </Box>
  )
}
