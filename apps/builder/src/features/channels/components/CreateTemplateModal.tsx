import React, { useState } from 'react';
import {
  Input,
  Select,
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
  ModalFooter
} from '@chakra-ui/react';
import { api } from '@/services/api';
import { WhatsAppTemplate, TemplateCategory, ComponentType, ButtonType } from './types/whatsapp.types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateTemplateModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [templateData, setTemplateData] = useState<WhatsAppTemplate>({
    name: '',
    category: TemplateCategory.MARKETING,
    components: []
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, field: string) => {
    const value = e.target.value;
    setTemplateData(prev => ({
      ...prev,
      [field]: value,
    } as WhatsAppTemplate));
  };

  const handleComponentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, index: number, field: string) => {
    const value = e.target.value;
    const updatedComponents = [...templateData.components];
    updatedComponents[index] = {
      ...updatedComponents[index],
      [field]: value,
    };

    if (field === 'type' && value === ComponentType.BUTTON) {
      updatedComponents[index].buttons = [{ type: ButtonType.QUICK_REPLY, text: '' }];
    }

    setTemplateData(prev => ({
      ...prev,
      components: updatedComponents,
    } as WhatsAppTemplate));
  };

  const handleButtonChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, componentIndex: number, buttonIndex: number, field: string) => {
    const value = e.target.value;
    const updatedComponents = [...templateData.components];
    const updatedButtons = [...(updatedComponents[componentIndex].buttons || [])];
    updatedButtons[buttonIndex] = {
      ...updatedButtons[buttonIndex],
      [field]: value,
    };
    updatedComponents[componentIndex].buttons = updatedButtons;
    setTemplateData(prev => ({
      ...prev,
      components: updatedComponents,
    } as WhatsAppTemplate));
  };

  const addComponent = () => {
    setTemplateData(prev => ({
      ...prev,
      components: [...prev.components, { type: ComponentType.HEADER, format: 'TEXT' }],
    } as WhatsAppTemplate));
  };

  const createModel = async () => {
    if (!templateData) return;
    setIsLoading(true);
    const res = await api.post('whatsapp/template', {
      json: templateData
    });
    if (!res.ok) {
      setErrorMsg('Erro ao criar modelo');
    }
    const data = await res.json();
    console.log('dataModalWPP', data);
    setIsLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Criar Template do WhatsApp</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Nome:</FormLabel>
            <Input placeholder="Nome do template" onChange={(e) => handleInputChange(e, 'name')} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Categoria:</FormLabel>
            <Select placeholder="Selecionar categoria" onChange={(e) => handleInputChange(e, 'category')}>
              <option value={TemplateCategory.AUTHENTICATION}>Authentication</option>
              <option value={TemplateCategory.MARKETING}>Marketing</option>
              <option value={TemplateCategory.UTILITY}>Utility</option>
            </Select>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Componentes:</FormLabel>
            {(templateData.components || []).map((component, index) => (
              <Box key={index} mt={4}>
                <Select placeholder="Selecionar tipo de componente" onChange={(e) => handleComponentChange(e, index, 'type')}>
                  <option value={ComponentType.HEADER}>Header</option>
                  <option value={ComponentType.BODY}>Body</option>
                  <option value={ComponentType.FOOTER}>Footer</option>
                  <option value={ComponentType.BUTTON}>Button</option>
                </Select>
                {component.type === ComponentType.BUTTON ? (
                  (component.buttons || []).map((button, buttonIndex) => (
                    <Box key={buttonIndex} mt={2}>
                      <Select placeholder="Selecionar tipo de botão" onChange={(e) => handleButtonChange(e, index, buttonIndex, 'type')}>
                        <option value={ButtonType.URL}>URL</option>
                        <option value={ButtonType.POSTBACK}>Postback</option>
                        <option value={ButtonType.CALL}>Call</option>
                        <option value={ButtonType.DIAL}>Dial</option>
                        <option value={ButtonType.LOCATION}>Location</option>
                        <option value={ButtonType.CONTACT}>Contact</option>
                        <option value={ButtonType.QUICK_REPLY}>Quick Reply</option>
                      </Select>
                      <Input mt={2} placeholder="Texto do botão" onChange={(e) => handleButtonChange(e, index, buttonIndex, 'text')} />
                    </Box>
                  ))
                ): (
                  <Input mt={2} placeholder="Texto" onChange={(e) => handleComponentChange(e, index, 'text')} />
                )}
              </Box>
            ))}
            <Button mt={4} onClick={addComponent}>Adicionar componente</Button>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={createModel} isLoading={isLoading}>
            Criar
          </Button>
          <Button variant="ghost" onClick={onClose}>Fechar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CreateTemplateModal;
