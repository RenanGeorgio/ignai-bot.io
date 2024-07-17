import React, { useState } from 'react';
import {
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  IconButton,
  Stack,
  Avatar,
  Text,
  Flex,
  Divider,
  Checkbox,
  VStack
} from '@chakra-ui/react';
import Sidebar from './SidebarEmail';
import ComposeEmailModal from './ComposeEmailModal';
import EmailDetails from './EmailDetails';
import { Email } from '../types'
import { DashboardHeader } from '@/features/dashboard/components/DashboardHeader';
import CustomSideBar from '@/components/SideBar';

export const EmailPage: React.FC = () => {
  const [isComposeModalOpen, setComposeModalOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [checkedEmails, setCheckedEmails] = useState<Set<number>>(new Set());

  const handleOpenComposeModal = () => {
    setComposeModalOpen(true);
  };

  const handleCloseComposeModal = () => {
    setComposeModalOpen(false);
  };

  const handleSentEmailsClick = () => {
    setSelectedEmail(null); 
  };

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
  };

  const handleBackToList = () => {
    setSelectedEmail(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCheckboxChange = (emailId: number) => {
    setCheckedEmails((prevCheckedEmails) => {
      const updatedCheckedEmails = new Set(prevCheckedEmails);
      if (updatedCheckedEmails.has(emailId)) {
        updatedCheckedEmails.delete(emailId);
      } else {
        updatedCheckedEmails.add(emailId);
      }
      return updatedCheckedEmails;
    });
  };

  const emailList: Email[] = [
    {
      id: 1,
      sender: 'John Doe',
      from: 'johndoe@email.com',
      to: 'devteam@email.com',
      avatar: 'https://bit.ly/dan-abramov',
      subject: 'Assunto do e-mail que pode ser bem longo dependendo do conteúdo',
      time: '12:34 PM',
      content: 'A implementação desses novos procedimentos é um passo importante para melhorar nossa eficiência e a qualidade do nosso trabalho. Entendo que mudanças podem ser desafiadoras, mas estou confiante de que esses novos processos nos ajudarão a crescer como equipe e a entregar projetos de maior qualidade. Cada desenvolvedor é responsável por manter uma documentação clara e concisa de suas funções e módulos. Isso é crucial para garantir que outros membros da equipe possam entender e trabalhar no seu código quando necessário. A implementação desses novos procedimentos é um passo importante para melhorar nossa eficiência e a qualidade do nosso trabalho. Entendo que mudanças podem ser desafiadoras, mas estou confiante de que esses novos processos nos ajudarão a crescer como equipe e a entregar projetos de maior qualidade. Cada desenvolvedor é responsável por manter uma documentação clara e concisa de suas funções e módulos. Isso é crucial para garantir que outros membros da equipe possam entender e trabalhar no seu código quando necessário.',
    },
    {
      id: 2,
      sender: 'Jane Smith',
      from: 'janesmith@email.com',
      to: 'devteam@email.com',
      avatar: 'https://bit.ly/kent-c-dodds',
      subject: 'Outro assunto de e-mail',
      time: '1:45 PM',
      content: 'A implementação desses novos procedimentos é um passo importante para melhorar nossa eficiência e a qualidade do nosso trabalho. Entendo que mudanças podem ser desafiadoras, mas estou confiante de que esses novos processos nos ajudarão a crescer como equipe e a entregar projetos de maior qualidade. Cada desenvolvedor é responsável por manter uma documentação clara e concisa de suas funções e módulos. Isso é crucial para garantir que outros membros da equipe possam entender e trabalhar no seu código quando necessário.',
    },
    {
      id: 3,
      sender: 'Alice Johnson',
      from: 'alicejohnson@email.com',
      to: 'devteam@email.com',
      avatar: 'https://bit.ly/ryan-florence',
      subject: 'Reunião marcada para a próxima semana',
      time: '2:30 PM',
      content: 'A implementação desses novos procedimentos é um passo importante para melhorar nossa eficiência e a qualidade do nosso trabalho.',
    },
  ];
  
  const filteredEmails = emailList.filter((email) =>
    email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.sender.toLowerCase().includes(searchQuery.toLowerCase())
  );  

  return (
    <VStack>
      <DashboardHeader />
      <Flex w="100%" px={4}>
        <CustomSideBar />
        <Sidebar
          onComposeClick={handleOpenComposeModal}
          onSentEmailsClick={handleSentEmailsClick}
        />
        <Box 
          p={4} 
          maxW="container.lg" 
          mx="auto" 
          h="700px"
          flex="1" 
          border="2px solid rgba(242, 45, 45, 0.373)"
          borderLeft="none"
          borderRadius="0px 10px 10px 0px"
          marginLeft="0px"
          marginTop="5px"
          marginBottom="20px"
          boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
        >
          {selectedEmail ? (
            <EmailDetails email={selectedEmail} onBack={handleBackToList} />
          ) : (
            <>
              <InputGroup mb={4} w="98%" h="35px" cursor="pointer" margin="10px">
                <InputLeftElement pointerEvents="none" margin="0px">
                  <svg fill="gray" width="16" height="16" viewBox="0 0 24 24"><path d="M10 2a8 8 0 015.29 13.29l4.58 4.58a1 1 0 01-1.42 1.42l-4.58-4.58A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z" /></svg>
                </InputLeftElement>
                <Input
                  placeholder="Buscar e-mail"
                  pl="35px"
                  width="100%"
                  borderRadius="10px"
                  border="1px solid #bababa"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </InputGroup>
              <Flex mb={4} align="center" margin="10px" p={2}>
                <Stack direction="row" spacing={4}>
                  <Checkbox
                    isChecked={checkedEmails.size > 0}
                    isIndeterminate={checkedEmails.size > 0 && checkedEmails.size < emailList.length}
                  />
                  <IconButton aria-label="Delete" cursor="pointer" marginLeft="10px" icon={<svg fill="gray" width="24" height="24" viewBox="0 0 24 24"><path d="M5 6h14v2H5z" /><path d="M9 6v12H7V6h2zm2 12V6h2v12h-2zm4 0V6h2v12h-2z" /></svg>} />
                </Stack>
              </Flex>
              <Divider mb={4} />
              <Stack spacing={4} margin="10px">
                {filteredEmails.length > 0 ? (
                  filteredEmails.map((email) => (
                    <Box
                      key={email.id}
                      display="flex"
                      alignItems="center"
                      p={4}
                      borderWidth={1}
                      borderRadius="10px"
                      height="75px"
                      boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
                      cursor="pointer"
                      onClick={() => handleEmailClick(email)}
                    >
                      <Checkbox
                        isChecked={checkedEmails.has(email.id)}
                        onChange={() => handleCheckboxChange(email.id)}
                        margin="5px"
                      />
                      <svg fill="gray" width="16" height="16" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29a1 1 0 001.44 1.32L12 18.68l6.06 2.93a1 1 0 001.44-1.32L12 2z" /></svg>
                      <Avatar name={email.sender} src={email.avatar} width="40px" borderRadius="20px" mr={4} margin="10px" />
                      <Box flex="1">
                        <Flex align="center">
                          <Text fontWeight="bold" isTruncated margin="10px">
                            {email.sender}
                          </Text>
                          <Text ml={4} color="gray.500" isTruncated>
                            {email.subject}
                          </Text>
                        </Flex>
                      </Box>
                      <Text color="gray.400" ml={4} margin="10px">
                        {email.time}
                      </Text>
                    </Box>
                  ))
                ) : (
                  <Text textAlign="center">Nenhum e-mail encontrado</Text>
                )}
              </Stack>
            </>
          )}
        </Box>
        <ComposeEmailModal isOpen={isComposeModalOpen} onClose={handleCloseComposeModal} />
      </Flex>
    </VStack>
  );
};
