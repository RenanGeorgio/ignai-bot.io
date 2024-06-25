import React from 'react';
import { Stack, VStack, StackDivider, Flex, Spacer, Table, TableContainer, TableCaption, Thead, Tr, Th, Td, Tbody, Box, Heading, Text } from '@chakra-ui/react';
import { WhatsAppLogo } from '@/components/logos/WhatsAppLogo';
import { EmailIcon, InstagramIcon, TelegramIcon } from '@/components/icons';
import { FacebookLogo } from '@/components/logos/FacebookLogo';
import { ChannelProps } from '../types';
import { DashboardHeader } from '@/features/dashboard/components/DashboardHeader';
import CustomSideBar from '@/components/SideBar';

const ChannelPage = ({ webObj, whatsappObj, igObj, telegramObj, emailObj, msgObj, hasNumbers, numbersList }: ChannelProps) => {
  return (
    <Stack overflowX="hidden" bgColor="gray.900" p={4} borderRadius="md" boxShadow="lg" width="70%">
      {hasNumbers && (
        <Flex my={4} p={4} bg="gray.800" borderRadius="md" boxShadow="md">
          <TableContainer>
            <Table variant='simple' colorScheme="teal">
              <TableCaption color="gray.400">Número Corporativo</TableCaption>
              <Thead>
                <Tr>
                  <Th color="teal.300">Número</Th>
                  <Th color="teal.300">País</Th>
                  <Th color="teal.300">Cidade</Th>
                  <Th color="teal.300">UF</Th>
                  <Th color="teal.300">Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {numbersList.map((currentNumber) => (
                  <Tr key={currentNumber.id} _hover={{ bg: "gray.700" }}>
                    <Td color="white">{currentNumber.id}</Td>
                    <Td color="white">{currentNumber.country}</Td>
                    <Td color="white">{currentNumber.city}</Td>
                    <Td color="white">{currentNumber.state}</Td>
                    <Td color="white">{currentNumber.status}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      )}
      <VStack
        divider={<StackDivider borderColor='gray.700' />}
        spacing={4}
        align='stretch'
        p={4}
        bg="gray.800"
        borderRadius="md"
        boxShadow="md"
      >
        {whatsappObj?.used && (
          <Flex minWidth='max-content' alignItems='center' gap='2' p={2} bg="gray.700" borderRadius="md" boxShadow="sm">
            <Box p='2'>
              <Heading size='md' color="white">{whatsappObj.id}</Heading>
            </Box>
            <Spacer />
            <WhatsAppLogo />
          </Flex>
        )}
        {igObj?.used && (
          <Flex minWidth='max-content' alignItems='center' gap='2' p={2} bg="gray.700" borderRadius="md" boxShadow="sm">
            <Box p='2'>
              <Heading size='md' color="white">{igObj.id}</Heading>
            </Box>
            <Spacer />
            <InstagramIcon />
          </Flex>
        )}
        {emailObj?.used && (
          <Flex minWidth='max-content' alignItems='center' gap='2' p={2} bg="gray.700" borderRadius="md" boxShadow="sm">
            <Box p='2'>
              <Heading size='md' color="white">{emailObj.id}</Heading>
            </Box>
            <Spacer />
            <EmailIcon />
          </Flex>
        )}
        {msgObj?.used && (
          <Flex minWidth='max-content' alignItems='center' gap='2' p={2} bg="gray.700" borderRadius="md" boxShadow="sm">
            <Box p='2'>
              <Heading size='md' color="white">{msgObj.id}</Heading>
            </Box>
            <Spacer />
            <FacebookLogo />
          </Flex>
        )}
        {telegramObj?.used && (
          <Flex minWidth='max-content' alignItems='center' gap='2' p={2} bg="gray.700" borderRadius="md" boxShadow="sm">
            <Box p='2'>
              <Heading size='md' color="white">{telegramObj.id}</Heading>
            </Box>
            <Spacer />
            <TelegramIcon />
          </Flex>
        )}
        {webObj?.used && (
          <Flex minWidth='max-content' alignItems='center' gap='2' p={2} bg="gray.700" borderRadius="md" boxShadow="sm">
            <Box p='2'>
              <Heading size='md' color="white">{webObj.id}</Heading>
            </Box>
            <Spacer />
            <FacebookLogo />
          </Flex>
        )}
      </VStack>
    </Stack>
  )
}

export default ChannelPage
