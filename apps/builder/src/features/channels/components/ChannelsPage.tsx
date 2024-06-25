import React from 'react';
import { Stack, VStack, StackDivider, Flex, Spacer, Table, TableContainer, TableCaption, Thead, Tr, Th, Td, Tbody, Box, Heading, Center } from '@chakra-ui/react';
import { WhatsAppLogo } from '@/components/logos/WhatsAppLogo';
import { EmailIcon, InstagramIcon, TelegramIcon } from '@/components/icons';
import { FacebookLogo } from '@/components/logos/FacebookLogo';
import { ChannelProps } from '../types';
import { DashboardHeader } from '@/features/dashboard/components/DashboardHeader';
import CustomSideBar from '@/components/SideBar';

const ChannelPage = ({ webObj, whatsappObj, igObj, telegramObj, emailObj, msgObj, hasNumbers, numbersList }: ChannelProps) => {
  return (
    <VStack spacing={4} align="stretch">
      <DashboardHeader />
      <Flex w="100%" px={4}>
        <CustomSideBar />
        <Center flex="1">
          <Stack overflowX="hidden" bgColor="red.900" p={4} borderRadius="md" boxShadow="lg" width="70%" mx="auto">
            {hasNumbers && (
              <Flex my={4} p={4} bg="white" borderRadius="md" boxShadow="md">
                <TableContainer>
                  <Table variant='simple' colorScheme="red">
                    <TableCaption color="red.900">Número Corporativo</TableCaption>
                    <Thead>
                      <Tr>
                        <Th color="red.900">Número</Th>
                        <Th color="red.900">País</Th>
                        <Th color="red.900">Cidade</Th>
                        <Th color="red.900">UF</Th>
                        <Th color="red.900">Status</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {numbersList.map((currentNumber) => (
                        <Tr key={currentNumber.id} _hover={{ bg: "red.100" }}>
                          <Td color="red.900">{currentNumber.id}</Td>
                          <Td color="red.900">{currentNumber.country}</Td>
                          <Td color="red.900">{currentNumber.city}</Td>
                          <Td color="red.900">{currentNumber.state}</Td>
                          <Td color="red.900">{currentNumber.status}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Flex>
            )}
            <VStack
              divider={<StackDivider borderColor='red.200' />}
              spacing={4}
              align='stretch'
              p={4}
              bg="white"
              borderRadius="md"
              boxShadow="md"
            >
              {whatsappObj?.used && (
                <Flex minWidth='max-content' alignItems='center' gap='2' p={2} bg="red.100" borderRadius="md" boxShadow="sm">
                  <Box p='2'>
                    <Heading size='md' color="red.900">{whatsappObj.id}</Heading>
                  </Box>
                  <Spacer />
                  <WhatsAppLogo />
                </Flex>
              )}
              {igObj?.used && (
                <Flex minWidth='max-content' alignItems='center' gap='2' p={2} bg="red.100" borderRadius="md" boxShadow="sm">
                  <Box p='2'>
                    <Heading size='md' color="red.900">{igObj.id}</Heading>
                  </Box>
                  <Spacer />
                  <InstagramIcon />
                </Flex>
              )}
              {emailObj?.used && (
                <Flex minWidth='max-content' alignItems='center' gap='2' p={2} bg="red.100" borderRadius="md" boxShadow="sm">
                  <Box p='2'>
                    <Heading size='md' color="red.900">{emailObj.id}</Heading>
                  </Box>
                  <Spacer />
                  <EmailIcon />
                </Flex>
              )}
              {msgObj?.used && (
                <Flex minWidth='max-content' alignItems='center' gap='2' p={2} bg="red.100" borderRadius="md" boxShadow="sm">
                  <Box p='2'>
                    <Heading size='md' color="red.900">{msgObj.id}</Heading>
                  </Box>
                  <Spacer />
                  <FacebookLogo />
                </Flex>
              )}
              {telegramObj?.used && (
                <Flex minWidth='max-content' alignItems='center' gap='2' p={2} bg="red.100" borderRadius="md" boxShadow="sm">
                  <Box p='2'>
                    <Heading size='md' color="red.900">{telegramObj.id}</Heading>
                  </Box>
                  <Spacer />
                  <TelegramIcon />
                </Flex>
              )}
              {webObj?.used && (
                <Flex minWidth='max-content' alignItems='center' gap='2' p={2} bg="red.100" borderRadius="md" boxShadow="sm">
                  <Box p='2'>
                    <Heading size='md' color="red.900">{webObj.id}</Heading>
                  </Box>
                  <Spacer />
                  <FacebookLogo />
                </Flex>
              )}
            </VStack>
          </Stack>
        </Center>
      </Flex>
    </VStack>
  )
}

export default ChannelPage
