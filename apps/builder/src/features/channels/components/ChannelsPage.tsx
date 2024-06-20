import React from 'react';
import { Stack, VStack, StackDivider, Flex, Spacer, Table, TableContainer, TableCaption, Thead, Tr, Th, Td, Tbody, Box, Heading } from '@chakra-ui/react';
import { WhatsAppLogo } from '@/components/logos/WhatsAppLogo';
import { EmailIcon, InstagramIcon, TelegramIcon } from '@/components/icons';
import { FacebookLogo } from '@/components/logos/FacebookLogo';
import { ChannelProps } from '../types';

const ChannelPage = ({ webObj, whatsappObj, igObj, telegramObj, emailObj, msgObj, hasNumbers, numbersList }: ChannelProps) => {

  return (
    <Stack overflowX="hidden" bgColor="gray.900">
      {hasNumbers && (
        <Flex>
          <TableContainer>
            <Table variant='simple'>
              <TableCaption>Número Corporativo</TableCaption>
              <Thead>
                <Tr>
                  <Th>Número</Th>
                  <Th>País</Th>
                  <Th>Cidade</Th>
                  <Th>UF</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {numbersList.map((currentNumber) => {
                  <Tr>
                    <Td>{currentNumber.id}</Td>
                    <Td>{currentNumber.country}</Td>
                    <Td>{currentNumber.city}</Td>
                    <Td>{currentNumber.state}</Td>
                    <Td>{currentNumber.status}</Td>
                  </Tr>
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      )}
      <VStack
        divider={<StackDivider borderColor='gray.200' />}
        spacing={4}
        align='stretch'
      >
        {whatsappObj?.used && (
          <Flex minWidth='max-content' alignItems='center' gap='2'>
            <Box p='2'>
              <Heading size='md'>{whatsappObj?.id}</Heading>
            </Box>
            <Spacer />
            <WhatsAppLogo />
          </Flex>
        )}
        {igObj?.used && (
          <Flex minWidth='max-content' alignItems='center' gap='2'>
            <Box p='2'>
              <Heading size='md'>{igObj?.id}</Heading>
            </Box>
            <Spacer />
            <InstagramIcon />
          </Flex>
        )}
        {emailObj?.used && (
          <Flex minWidth='max-content' alignItems='center' gap='2'>
            <Box p='2'>
              <Heading size='md'>{emailObj?.id}</Heading>
            </Box>
            <Spacer />
            <EmailIcon />
          </Flex>
        )}
        {msgObj?.used && (
          <Flex minWidth='max-content' alignItems='center' gap='2'>
            <Box p='2'>
              <Heading size='md'>{msgObj?.id}</Heading>
            </Box>
            <Spacer />
            <FacebookLogo />
          </Flex>
        )}
        {telegramObj?.used && (
          <Flex minWidth='max-content' alignItems='center' gap='2'>
            <Box p='2'>
              <Heading size='md'>{telegramObj?.id}</Heading>
            </Box>
            <Spacer />
            <TelegramIcon />
          </Flex>
        )}
        {webObj?.used && (
          <Flex minWidth='max-content' alignItems='center' gap='2'>
            <Box p='2'>
              <Heading size='md'>{webObj?.id}</Heading>
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