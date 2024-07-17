import React from 'react';
import { Box, VStack, Button, Text, Icon } from '@chakra-ui/react';

interface SidebarProps {
  onComposeClick: () => void;
  onSentEmailsClick: () => void; 
}

const SidebarEmail: React.FC<SidebarProps> = ({ onComposeClick, onSentEmailsClick }: SidebarProps) => {
  return (
    <Box
      w="250px"
      height="700px"
      bg="gray.100"
      p={4}
      border="2px rgba(242, 45, 45, 0.373) solid"
      boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
      borderRadius="10px 0px 0px 10px"
      margin="auto"
      marginRight="0px"
      marginTop="5px"
      marginBottom="20px"
    >
      <VStack spacing={4} align="stretch">
        <Button
          variant="outline"
          onClick={onComposeClick}
          padding="10px"
          bg="rgba(242, 45, 45)"
          color="#fff"
          border="1px solid rgba(155, 155, 155, 0.373)"
          borderRadius="10px"
          cursor="pointer"
          margin="15px"
          _hover={{
            bg:"rgba(242, 45, 45, 0.650)",
            transform:"scale(1.05)"
          }}
        >
          Escrever Email
        </Button>
        <Text cursor="pointer" margin="15px" onClick={onSentEmailsClick}> 
          <Icon pointerEvents="none" margin="7px">
            <svg fill="gray" width="22" height="22" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29a1 1 0 001.44 1.32L12 18.68l6.06 2.93a1 1 0 001.44-1.32L12 2z" /></svg>
          </Icon>
          Emails enviados
        </Text>
      </VStack>
    </Box>
  );
}

export default SidebarEmail