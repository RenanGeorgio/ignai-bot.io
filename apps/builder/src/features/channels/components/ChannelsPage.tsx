import React from 'react';
import { Stack, VStack, Flex, Spacer, Table, TableContainer, TableCaption, Thead, Tr, Th, Td, Tbody, Box, Heading, Center, Button, useDisclosure } from '@chakra-ui/react';
import { WhatsAppLogo } from '@/components/logos/WhatsAppLogo';
import { EmailIcon, InstagramIcon, TelegramIcon } from '@/components/icons';
import { FacebookLogo } from '@/components/logos/FacebookLogo';
import { ChannelProps } from '../types';
import { DashboardHeader } from '@/features/dashboard/components/DashboardHeader';
import CustomSideBar from '@/components/SideBar';
import CreateTemplateModal from './CreateTemplateModal';

export const ChannelsPage: React.FC = ({ webObj, whatsappObj, igObj, telegramObj, emailObj, msgObj, hasNumbers, numbersList }: ChannelProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <VStack spacing={4} align="stretch">
      <DashboardHeader />
      <Flex w="100%" px={4}>
        <CustomSideBar />
        <Center flex="1">
          <VStack spacing={6} height="85vh" overflowY="auto" p={4} width="95%" mx="auto">
            <Flex my={4} p={4} bg="white" borderRadius="md" boxShadow="md" width="100%" border="1px solid red">
              <Heading size='md' mb={4} color="red.900">Número Corporativo</Heading>
              <Center p='2' width="70%">
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
                      {hasNumbers ? (
                        numbersList.map((currentNumber) => (
                          <Tr key={currentNumber.id} _hover={{ bg: "red.100" }}>
                            <Td color="red.900">{currentNumber.id}</Td>
                            <Td color="red.900">{currentNumber.country}</Td>
                            <Td color="red.900">{currentNumber.city}</Td>
                            <Td color="red.900">{currentNumber.state}</Td>
                            <Td color="red.900">{currentNumber.status}</Td>
                          </Tr>
                        ))
                      ) : (
                        <Tr>
                          <Td colSpan={5} textAlign="center" color="red.900">Nenhum número disponível</Td>
                        </Tr>
                      )}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Center>
            </Flex>
            <Stack spacing={4} p={4} bg="white" borderRadius="md" boxShadow="md" width="100%" border="1px solid red">
              <Heading size='md' color="red.900">WhatsApp Template</Heading>
              <Button colorScheme="red" onClick={onOpen} w="250px" alignSelf="center">Criar Template</Button>
              <CreateTemplateModal isOpen={isOpen} onClose={onClose} />
            </Stack>
            <Stack spacing={4} p={4} bg="white" borderRadius="md" boxShadow="md" width="100%" border="1px solid red">
              <Heading size='md' color="red.900">WhatsApp</Heading>
              {whatsappObj?.used ? (
                <Flex minWidth='max-content' alignItems='center' gap='2' bg="red.100" p='1' borderRadius='15px' marginBottom="10px">
                  <Box p='2'>
                    <Heading size='md' color="red.600">{whatsappObj.id}</Heading>
                  </Box>
                  <Spacer />
                  <WhatsAppLogo />
                </Flex>
              ) : (
                <Center p='2' width="100%">
                  <Heading size='sm' color="red.500">Nenhum dado disponível</Heading>
                </Center>
              )}
            </Stack>
            <Stack spacing={4} p={4} bg="white" borderRadius="md" boxShadow="md" width="100%" border="1px solid red">
              <Heading size='md' color="red.900">Instagram</Heading>
              {igObj?.used ? (
                <Flex minWidth='max-content' alignItems='center' gap='2' bg="red.100" p='1' borderRadius='15px' marginBottom="10px">
                  <Box p='2'>
                    <Heading size='md' color="red.600">{igObj.id}</Heading>
                  </Box>
                  <Spacer />
                  <InstagramIcon />
                </Flex>
              ) : (
                <Center p='2' width="100%">
                  <Heading size='sm' color="red.500">Nenhum dado disponível</Heading>
                </Center>
              )}
            </Stack>
            <Stack spacing={4} p={4} bg="white" borderRadius="md" boxShadow="md" width="100%" border="1px solid red">
              <Heading size='md' color="red.900">Email</Heading>
              {emailObj?.used ? (
                <Flex minWidth='max-content' alignItems='center' gap='2' bg="red.100" p='1' borderRadius='15px' marginBottom="10px">
                  <Box p='2'>
                    <Heading size='md' color="red.600">{emailObj.id}</Heading>
                  </Box>
                  <Spacer />
                  <EmailIcon />
                </Flex>
              ) : (
                <Center p='2' width="100%">
                  <Heading size='sm' color="red.500">Nenhum dado disponível</Heading>
                </Center>
              )}
            </Stack>
            <Stack spacing={4} p={4} bg="white" borderRadius="md" boxShadow="md" width="100%" border="1px solid red">
              <Heading size='md' color="red.900">Facebook</Heading>
              {msgObj?.used ? (
                <Flex minWidth='max-content' alignItems='center' gap='2' bg="red.100" p='1' borderRadius='15px' marginBottom="10px">
                  <Box p='2'>
                    <Heading size='md' color="red.600">{msgObj.id}</Heading>
                  </Box>
                  <Spacer />
                  <FacebookLogo />
                </Flex>
              ) : (
                <Center p='2' width="100%">
                  <Heading size='sm' color="red.500">Nenhum dado disponível</Heading>
                </Center>
              )}
            </Stack>
            <Stack spacing={4} p={4} bg="white" borderRadius="md" boxShadow="md" width="100%" border="1px solid red">
              <Heading size='md' color="red.900">Telegram</Heading>
              {telegramObj?.used ? (
                <Flex minWidth='max-content' alignItems='center' gap='2' bg="red.100" p='1' borderRadius='15px' marginBottom="10px">
                  <Box p='2'>
                    <Heading size='md' color="red.600">{telegramObj.id}</Heading>
                  </Box>
                  <Spacer />
                  <TelegramIcon />
                </Flex>
              ) : (
                <Center p='2' width="100%">
                  <Heading size='sm' color="red.500">Nenhum dado disponível</Heading>
                </Center>
              )}
            </Stack>
            <Stack spacing={4} p={4} bg="white" borderRadius="md" boxShadow="md" width="100%" border="1px solid red">
              <Heading size='md' color="red.900">Website</Heading>
              {webObj?.used ? (
                <Flex minWidth='max-content' alignItems='center' gap='2' bg="red.100" p='1' borderRadius='15px' marginBottom="10px">
                  <Box p='2'>
                    <Heading size='md' color="red.600">{webObj.id}</Heading>
                  </Box>
                  <Spacer />
                  <FacebookLogo />
                </Flex>
              ) : (
                <Center p='2' width="100%">
                  <Heading size='sm' color="red.500">Nenhum dado disponível</Heading>
                </Center>
              )}
            </Stack>
          </VStack>
        </Center>
      </Flex>
    </VStack>
  );
}