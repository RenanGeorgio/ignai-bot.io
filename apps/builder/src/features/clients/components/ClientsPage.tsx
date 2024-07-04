import React, { useState, useEffect } from 'react'
import { Seo } from '@/components/Seo'
import { Stack, VStack, Spinner, Text, Flex, Box, Heading, Center } from '@chakra-ui/react'
import CustomSideBar from '@/components/SideBar'
import { DashboardHeader } from '@/features/dashboard/components/DashboardHeader'
import { ClientsList } from './ClientsList'
import { useTranslate } from '@tolgee/react'
import { ClientsProvider } from '../contexts/ClientsProvider'
import ClientsDetails from './ClientsDetails'
import { Client } from '../types';

export const ClientsPage = () => {
  const { t } = useTranslate()

  const [isLoading, setIsLoading] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  useEffect(() => {
    // verificar dps
    setIsLoading(false)
  }, [])

  const handleClientClick = (client: Client) => {
    setSelectedClient(client)
  }

  return (
    <Stack minH="100vh">
      <Seo title={'Clientes'} />
      <DashboardHeader />
      <ClientsProvider>
        {isLoading ? (
          <VStack w="full" justifyContent="center" pt="10" spacing={6}>
            <Text>{t('dashboard.redirectionMessage')}</Text>
            <Spinner />
          </VStack>
        ) : (
          <Flex w="100%">
            <CustomSideBar />
            <Flex
              w="100%"
              p="4"
              marginLeft="20px"
              flexDirection={{ base: 'column', md: 'row' }}
            >
              <Box
                w={{ base: '100%', md: '65%' }}
                p="4"
                boxShadow="md"
                borderRadius="10px"
                border="1px solid red"
                mb={{ base: '4', md: '0' }}
              >
                <Center marginBottom="15px">
                  <Heading size="md" mb={4} color="red.900" margin="10px">Lista de Clientes</Heading>
                </Center>
                <ClientsList onClientClick={handleClientClick} selectedClient={selectedClient}/>
              </Box>
              <Box
                w={{ base: '100%', md: '35%' }}
                boxShadow="md"
                borderRadius="10px"
                marginLeft={{ base: '0', md: '15px' }}
                border="1px solid red"
              >
                <Center>
                  <Heading size="md" mb={4} color="red.900" margin="10px" marginTop="25px">Detalhes</Heading>
                </Center>
                <ClientsDetails client={selectedClient} />
              </Box>
            </Flex>
          </Flex>
        )}
      </ClientsProvider>
    </Stack>
  )
}
