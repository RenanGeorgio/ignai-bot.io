import React from 'react';
import { Box, Flex, Avatar, Text, VStack, HStack, Stack } from '@chakra-ui/react';
import { Email } from '../types';

interface EmailDetailsProps {
  email: Email
  onBack: () => void
}

const EmailDetails: React.FC<EmailDetailsProps> = ({ email, onBack }: EmailDetailsProps) => {
  return (
    <Box p={4} maxW="container.lg" mx="auto" flex="1">
      <Flex 
        width="99.9%"
        height="60px"
        align="center" 
        marginTop="-10px"
        mb={4} 
        border="1px solid rgba(210, 210, 210, 0.373)"
        boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
        borderTopRadius="8px"
      >
        <Text
          aria-label="Back"
          onClick={onBack}
          mr={2}
          marginLeft="10px"
          marginRight="25px"
          borderRadius="20px"
          cursor="pointer"
          color="#a50000"
        > 
          voltar
        </Text>
        <Text fontSize="md" fontWeight="bold">{email?.subject}</Text>
      </Flex>
      <VStack 
        height="600px" 
        marginTop="-15px"
        backgroundColor="#d3d3d34d" 
        borderBottomRadius="10px" 
        border="1px solid rgba(210, 210, 210, 0.373)"
        borderTop="none"
      >
        <Stack bg="#fff" marginTop="50px" width="80%" height="80%" borderRadius="10px" p={4}>
          <HStack boxShadow="0 10px 10px -10px rgba(0, 0, 0, 0.2)">
            <Flex mb={4} alignItems="center">
              <Avatar 
                name={email?.sender} 
                src={email?.avatar}
                mr={4} 
                width="40px" 
                borderRadius="20px"
                margin="10px"
              />
              <Box>
                <Text fontWeight="bold" align="left" marginBottom="0px">
                  {email?.sender}
                </Text>
                <Text marginTop="0px" color="#686868">
                  {email?.from}
                </Text>
              </Box>
            </Flex>
            <Text marginLeft="auto" marginRight="20px">{email?.time}</Text>
          </HStack>
          <VStack align="left" borderBottom="1px solid #bababa" height="100px">
            <Flex mb={4} alignItems="left">
              <Text fontWeight="bold" mb={2} marginLeft="10px">De:</Text>
              <Box marginLeft="10px">
                <Text color="#686868">{email?.from}</Text>
              </Box>
            </Flex>
            <Flex mb={4} alignItems="left" marginTop="-25px">
              <Text fontWeight="bold" mb={2} marginLeft="10px">Para:</Text>
              <Box marginLeft="10px">
                <Text mb={4} color="#686868">{email?.to}</Text>
              </Box>
            </Flex>
            <Flex mb={4} alignItems="left" marginTop="-35px">
              <Text fontWeight="bold" mb={2} marginLeft="10px">Assunto:</Text>
              <Box marginLeft="10px">
                <Text mb={4}>{email?.subject}</Text>
              </Box>
            </Flex>
          </VStack>
          <Box
            height="37%"
            width="100%"
            overflowY="auto"
            overflowX="hidden"
            css={{
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'red',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: '#a50000',
              },
              paddingRight: '10px', 
            }}
          >
            <Text
              margin="10px"
              marginBottom="50px"
              width="calc(100% - 20px)"  
              whiteSpace="wrap"
              overflowWrap="break-word"
              textAlign="justify"
            >
              {email?.content || 'Conteúdo do email não disponível.'}
            </Text>
          </Box>
          <HStack borderTop="1px solid #bababa">
            <Text marginLeft="10px" marginTop="5px" fontWeight="bold">Anexo:</Text>
          </HStack>
        </Stack>
      </VStack>
    </Box>
  );
}

export default EmailDetails