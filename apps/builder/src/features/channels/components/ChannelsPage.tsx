import React from 'react';
import { Stack, VStack, Flex, Spacer, Table, TableContainer, TableCaption, Thead, Tr, Th, Td, Tbody, Box, Heading, Center } from '@chakra-ui/react';
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
          <VStack spacing={6} overflowX="hidden" p={4} width="95%" mx="auto">
            {hasNumbers && (
              <Flex my={4} p={4} bg="white" borderRadius="md" boxShadow="md" width="100%">
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

            {whatsappObj?.used && (
              <Stack spacing={4} p={4} bg="red.100" borderRadius="md" boxShadow="md" width="100%">
                <Flex minWidth='max-content' alignItems='center' gap='2'>
                  <Box p='2'>
                    <Heading size='md' color="red.900">{whatsappObj.id}</Heading>
                  </Box>
                  <Spacer />
                  <WhatsAppLogo />
                </Flex>
              </Stack>
            )}

            {igObj?.used && (
              <Stack spacing={4} p={4} bg="red.100" borderRadius="md" boxShadow="md" width="100%">
                <Flex minWidth='max-content' alignItems='center' gap='2'>
                  <Box p='2'>
                    <Heading size='md' color="red.900">{igObj.id}</Heading>
                  </Box>
                  <Spacer />
                  <InstagramIcon />
                </Flex>
              </Stack>
            )}

            {emailObj?.used && (
              <Stack spacing={4} p={4} bg="red.100" borderRadius="md" boxShadow="md" width="100%">
                <Flex minWidth='max-content' alignItems='center' gap='2'>
                  <Box p='2'>
                    <Heading size='md' color="red.900">{emailObj.id}</Heading>
                  </Box>
                  <Spacer />
                  <EmailIcon />
                </Flex>
              </Stack>
            )}

            {msgObj?.used && (
              <Stack spacing={4} p={4} bg="red.100" borderRadius="md" boxShadow="md" width="100%">
                <Flex minWidth='max-content' alignItems='center' gap='2'>
                  <Box p='2'>
                    <Heading size='md' color="red.900">{msgObj.id}</Heading>
                  </Box>
                  <Spacer />
                  <FacebookLogo />
                </Flex>
              </Stack>
            )}

            {telegramObj?.used && (
              <Stack spacing={4} p={4} bg="red.100" borderRadius="md" boxShadow="md" width="100%">
                <Flex minWidth='max-content' alignItems='center' gap='2'>
                  <Box p='2'>
                    <Heading size='md' color="red.900">{telegramObj.id}</Heading>
                  </Box>
                  <Spacer />
                  <TelegramIcon />
                </Flex>
              </Stack>
            )}

            {webObj?.used && (
              <Stack spacing={4} p={4} bg="red.100" borderRadius="md" boxShadow="md" width="100%">
                <Flex minWidth='max-content' alignItems='center' gap='2'>
                  <Box p='2'>
                    <Heading size='md' color="red.900">{webObj.id}</Heading>
                  </Box>
                  <Spacer />
                  <FacebookLogo />
                </Flex>
              </Stack>
            )}
          </VStack>
        </Center>
      </Flex>
    </VStack>
  );
}
export default ChannelPage
