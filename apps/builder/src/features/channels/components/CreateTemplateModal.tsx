import React from 'react';
//import { HTTPError } from 'ky';
import {
  Modal,
} from '@chakra-ui/react';
//import { api } from '@/services/api';

interface Props {
  isOpen: boolean
  onClose: () => void
}

const CreateTemplateModal: React.FC<Props> = ({ isOpen, onClose }: Props) => {
/*
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
  }*/

  /*
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
  }*/

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
    </Modal>
  )
}

export default CreateTemplateModal