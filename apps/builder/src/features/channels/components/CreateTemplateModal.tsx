import React, { useState } from 'react';
import { HTTPError } from 'ky';
import {
  Input,
  Select,
  Checkbox,
  Box,
  Button,
  FormLabel,
  FormControl,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
} from '@chakra-ui/react';
import { api } from '@/services/api';
import {
  WhatsAppTemplate,
  TemplateCategory,
  ComponentType,
  ButtonType,
  TemplateResponseData,
  TemplateCreationStatus,
} from './types/whatsapp.types';

interface Props {
  isOpen: boolean
  onClose: () => void
}

const CreateTemplateModal: React.FC<Props> = ({ isOpen, onClose }: Props) => {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedComponents, setSelectedComponents] = useState<number[]>([])
  const [templateData, setTemplateData] = useState<WhatsAppTemplate>(
    {
      name: '',
      category: TemplateCategory.MARKETING,
      components: []
    }
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    field: string
  ) => {
    const value = e.target.value
    setTemplateData(
      (prev) =>
        ({
          ...prev,
          [field]: value,
        } as WhatsAppTemplate)
    )
  }

  const handleComponentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    index: number,
    field: string
  ) => {
    const value = e.target.value;
    const updatedComponents = [...templateData.components];
    updatedComponents[index] = {
      ...updatedComponents[index],
      [field]: value,
    };

    if (field === 'type' && value === ComponentType.BUTTON) {
      updatedComponents[index].buttons = [
        { type: ButtonType.QUICK_REPLY, text: '' }
      ]
    }

    if(field === 'type' && value === ComponentType.HEADER) {
      updatedComponents[index].format = 'TEXT'
    }

    setTemplateData(
      (prev) =>
        ({
          ...prev,
          components: updatedComponents,
        } as WhatsAppTemplate)
    )
  }

  const handleButtonChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    componentIndex: number,
    buttonIndex: number,
    field: string
  ) => {
    const value = e.target.value;
    const updatedComponents = [...templateData.components];
    const updatedButtons = [
      ...(updatedComponents[componentIndex].buttons || [])
    ];
    updatedButtons[buttonIndex] = {
      ...updatedButtons[buttonIndex],
      [field]: value
    };
    updatedComponents[componentIndex].buttons = updatedButtons;
    setTemplateData(
      (prev) =>
        ({
          ...prev,
          components: updatedComponents,
        } as WhatsAppTemplate)
    );
  }

  const addComponent = () => {
    setTemplateData(
      (prev) =>
        ({
          ...prev,
          components: [
            ...prev.components,
            { type: ComponentType.HEADER },
          ],
        } as WhatsAppTemplate
      )
    )
  }

  const removeComponent = () => {
    const updatedComponents = templateData.components.filter(
      (_, index) => !selectedComponents.includes(index)
    )
    setTemplateData(
      (prev) =>
        ({
          ...prev,
          components: updatedComponents,
        } as WhatsAppTemplate)
    )
    setSelectedComponents([])
  }

  const createModel = async () => {
    if (!templateData) {
      return
    }

    setIsLoading(true);
    try {
      const res = await api.post('whatsapp/template', {
        json: templateData
      });

      if (!res.ok) {
        setErrorMsg('Erro ao criar modelo');
      }

      const data = await res.json() as TemplateResponseData;

      if (data.message.status === TemplateCreationStatus.REJECTED) {
        setErrorMsg("Modelo rejeitado pelo WhatsApp");
      }

      if (data.message.status === TemplateCreationStatus.PENDING) {
        alert("Modelo em análise pelo WhatsApp");
        onClose();
      }
  
      setIsLoading(false);
    } catch (error) {
      if (error instanceof HTTPError) {
        const e = await error.response.json();

        if (e?.error_user_msg) {
          console.log('errorMsg', e.error_user_msg);
          setErrorMsg(e.error_user_msg);
        } else if (e.message) {
          setErrorMsg(e.message);
        }
      }

      setIsLoading(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxH="80vh">
        <ModalHeader>Criar Template do WhatsApp</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          overflowY="auto"
          maxH="60vh"
          css={{
            '&::-webkit-scrollbar': {
              width: '5px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgb(255, 101, 101)',
              borderRadius: '5px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: 'darkred',
            },
          }}
        >
          <FormControl>
            <FormLabel>Nome:</FormLabel>
            <Input
              placeholder="Nome do template"
              onChange={(e) => handleInputChange(e, 'name')}
              required
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Categoria:</FormLabel>
            <Select
              placeholder="Selecionar categoria"
              onChange={(e) => handleInputChange(e, 'category')}
              required
            >
              <option value={TemplateCategory.AUTHENTICATION}>
                Authentication
              </option>
              <option value={TemplateCategory.MARKETING}>Marketing</option>
              <option value={TemplateCategory.UTILITY}>Utility</option>
            </Select>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Componentes:</FormLabel>
            {templateData.components.map((component, index) => (
              <Box key={index} mt={4} position="relative">
                <Checkbox
                  isChecked={selectedComponents.includes(index)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedComponents((prev) => [...prev, index])
                    } else {
                      setSelectedComponents((prev) =>
                        prev.filter((item) => item !== index)
                      )
                    }
                  }}
                  position="absolute"
                  left="0px"
                  top="5px"
                />
                <Select
                  placeholder="Selecionar tipo de componente"
                  onChange={(e) => handleComponentChange(e, index, 'type')}
                  ml="30px"
                  w="370px"
                  required
                >
                  <option value={ComponentType.HEADER}>Header</option>
                  <option value={ComponentType.BODY}>Body</option>
                  <option value={ComponentType.FOOTER}>Footer</option>
                  <option value={ComponentType.BUTTON}>Button</option>
                </Select>
                {component.type === ComponentType.BUTTON ? (
                  (component.buttons || []).map((button, buttonIndex) => (
                    <Box key={buttonIndex} mt={2}>
                      <Select
                        placeholder="Selecionar tipo de botão"
                        onChange={(e) =>
                          handleButtonChange(e, index, buttonIndex, 'type')
                        }
                        ml="30px"
                        w="370px"
                        required
                      >
                        <option value={ButtonType.URL}>URL</option>
                        <option value={ButtonType.POSTBACK}>Postback</option>
                        <option value={ButtonType.CALL}>Call</option>
                        <option value={ButtonType.DIAL}>Dial</option>
                        <option value={ButtonType.LOCATION}>Location</option>
                        <option value={ButtonType.CONTACT}>Contact</option>
                        <option value={ButtonType.QUICK_REPLY}>
                          Quick Reply
                        </option>
                      </Select>
                      <Input
                        mt={2}
                        placeholder="Texto do botão"
                        onChange={(e) =>
                          handleButtonChange(e, index, buttonIndex, 'text')
                        }
                        ml="30px"
                        w="370px"
                        required
                      />
                    </Box>
                  ))
                ) : (
                  <Input
                    mt={2}
                    placeholder="Texto"
                    onChange={(e) => handleComponentChange(e, index, 'text')}
                    ml="30px"
                    w="370px"
                    required
                  />
                )}
              </Box>
            ))}
            <Button
              mt={4}
              size="xs"
              onClick={addComponent}
              border="1px solid gray"
            >
              Adicionar componente
            </Button>
            <Button
              size="xs"
              color="red"
              border="1px solid gray"
              position="absolute"
              left="165px"
              bottom="0"
              onClick={removeComponent}
              disabled={selectedComponents.length === 0}
              style={{
                display: templateData.components.length > 0 ? 'block' : 'none',
              }}
            >
              Remover componente
            </Button>
          </FormControl>
        </ModalBody>
        {errorMsg && (
          <Box p={4} bg="red.100" color="red.600" textAlign="center">
            {errorMsg}
          </Box>
        )}
        <ModalFooter>
          <Button
            colorScheme="red"
            mr={3}
            onClick={createModel}
            isLoading={isLoading}
          >
            Criar
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreateTemplateModal