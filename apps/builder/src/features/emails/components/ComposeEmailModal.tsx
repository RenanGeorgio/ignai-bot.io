import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Text,
  HStack
} from '@chakra-ui/react';

interface ComposeEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ComposeEmailModal: React.FC<ComposeEmailModalProps> = ({ isOpen, onClose }: ComposeEmailModalProps) => {
  const [to, setTo] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSend = () => {
    console.log('Enviar email:', { to, subject, message });
    onClose(); 
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent
        bg="white"
        width="450px"
        height="400px"
        position="fixed"
        bottom="-10"
        right="5"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
        border="1px rgba(242, 45, 45, 0.373) solid"
        borderRadius="20px"
        cursor="pointer"
      >
        <ModalHeader 
          bg="#ffe6e695"
          p={2} 
          borderTopRadius="20px" 
          justifyContent="space-between" 
          textAlign="center"
          width="446px"
          fontFamily="sans-serif"
          fontSize="17px"
        >
          <Text fontSize="lg">Escrever email</Text>
        </ModalHeader>
        <ModalBody>
          <HStack borderBottom="1 px solid black">
            <Input 
              w="100%" 
              padding="5px" 
              placeholder="Informe destinatário.." 
              margin="10px"
              marginRight="5px"
              borderRadius="5px"
              border="1px solid #bababa"
              value={to} 
              onChange={(e) => setTo(e.target.value)} 
              mb={4} 
            />
          </HStack>  
          <HStack>
            <Input 
              w="100%" 
              padding="5px" 
              placeholder="Informe assunto.." 
              borderRadius="5px"
              border="1px solid #bababa"
              margin="10px"
              value={subject} onChange={(e) => setSubject(e.target.value)} 
              mb={4} 
            />
          </HStack>
          <HStack>         
            <Textarea
              placeholder="Enviar sua mensagem"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              resize="none"
              minHeight="120px"
              w="100%"
              padding="5px"
              margin="10px"
              marginBottom="-10px"
              borderRadius="5px"
              border="1px solid #bababa"
            />
          </HStack>
        </ModalBody>
        <ModalFooter justifyContent="flex-start">
          <Button  
            mr={3} 
            onClick={handleSend}  
            padding="10px" 
            width="80px"
            bg="rgba(242, 45, 45)" 
            color="#fff" 
            border="1px solid rgba(155, 155, 155, 0.373)" 
            borderRadius="10px"
            cursor="pointer"
            margin="10px"
          >
            Enviar
          </Button>
          <Button 
            variant="ghost" 
            onClick={onClose} 
            padding="10px" 
            width="80px"
            color="#000" 
            bg="#fff"
            border="1px solid rgba(242, 45, 45, 0.373)" 
            borderRadius="10px"
            cursor="pointer"
          >
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ComposeEmailModal