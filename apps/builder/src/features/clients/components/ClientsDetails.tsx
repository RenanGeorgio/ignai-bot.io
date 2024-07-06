import React from 'react';
import { Box, Text, Avatar, HStack, Tag, Center, Stack, Divider, VStack, Spacer } from '@chakra-ui/react';
import { Client } from '../types';

const ClientsDetails = ({ client }: { client: Client | null}) => {
  if (!client) {
    return (
      <Center>
        <Text marginTop="250px">Selecione um cliente para ver os detalhes</Text>
      </Center>
    );
  }

  // verifica se o cliente possui endereço
  const address = client.address ? client.address : {};

  return (
    <Box
      bg="rgba(255, 245, 245, 0.8)"
      boxShadow="md"
      p="6"
      borderRadius="10px"
      margin="12px"
      width={{ base: '95%', md: 'auto'}}
      cursor="pointer"
    >
      <VStack spacing="4" align="stretch" flex="1" alignItems="flex-start">
        <HStack spacing="4">
          <Avatar name={client.name} src={client?.image} size="md" />
          <VStack align="left" spacing="1">
            {client.name && (
              <Text fontSize="xl">
                {client.name}
              </Text>
            )}
            {client.isGuest && (
              <Tag color="red.500">
                Pendente
              </Tag>
            )}
          </VStack>
        </HStack>
        <Divider />
        <Stack spacing="3">
          <Text color="red.600" fontSize="md">
            <Text color="red.900">Username:</Text> {client.username ?? 'Não informado'}
          </Text>
          <Text color="red.600" fontSize="md">
            <Text color="red.900">Email:</Text> {client.email ?? 'Não informado'}
          </Text>
          <Text color="red.600" fontSize="md">
            <Text color="red.900">Telefone:</Text> {client.phone ?? 'Não informado'}
          </Text>
          <Text color="red.600" fontSize="md">
            <Text color="red.900">Status:</Text> {client.status ?? 'Não informado'}
          </Text>
          <Text color="red.900">Endereço</Text>
          <HStack spacing="10" width="100%">
            <Text color="red.600" fontSize="md">
              <Text color="red.900">Rua:</Text> {address?.street ?? 'Não informado'}
            </Text>
            <Spacer />
            <Text color="red.600" fontSize="md">
              <Text color="red.900">Número:</Text> {address?.number ?? 'Não informado'}
            </Text>
          </HStack>  
          <Text color="red.600" fontSize="md">
            <Text color="red.900">Bairro:</Text> {address?.neighborhood ?? 'Não informado'}
          </Text>
          <HStack spacing="10" width="100%">
            <Text color="red.600" fontSize="md">
              <Text color="red.900">Cidade:</Text> {address?.city ?? 'Não informado'}
            </Text>
            <Spacer />
            <Text color="red.600" fontSize="md">
              <Text color="red.900">Estado:</Text> {address?.state ?? 'Não informado'}
            </Text>
          </HStack>
        </Stack>
      </VStack>
    </Box>
  );
}

export default ClientsDetails;