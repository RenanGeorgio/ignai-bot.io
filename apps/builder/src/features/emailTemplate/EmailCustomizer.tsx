import React, { useState } from 'react'
import {
  Box,
  Button,
  Input,
  Select,
  Textarea,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  VStack,
  HStack,
  Spacer,
} from '@chakra-ui/react'
import { createEmailTemplate } from './queries/emailTemplate'
import { Templates, type EmailTemplate } from './types'

const EmailCustomizer = () => {
  const [emailSettings, setEmailSettings] = useState<Templates>({
    email: {
      name: 'Custom Email',
      category: 'custom',
      properties: {
        backgroundColor: '#ffffff',
        textColor: '#000000',
        borderColor: '#dddddd',
        fontSize: '16px',
        title: 'Título do e-mail',
        content: 'Insira o conteúdo do e-mail aqui.',
        textAlign: 'left',
        fontFamily: 'Arial',
        padding: '10px',
        margin: '0px',
        imageUrl: '',
      },
    },
    companyId: '65bbe0359f84da3af601f373',
  })

  const fontOptions = [
    'Arial',
    'Georgia',
    'Times New Roman',
    'Verdana',
    'Courier New',
  ]

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { name, value } = e.target;

    setEmailSettings((prev: Templates) => {
      if (prev?.email && (name in (prev?.email?.properties as unknown as EmailTemplate['properties']))) {
        return {
          ...prev,
          email: {
            ...prev.email,
            properties: {
              ...prev.email.properties,
              [name]: value,
            },
          },
        }
      }
      
      return prev;
    })
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const handleSave = (e: any) => {
    e.preventDefault();
    
    createEmailTemplate({
      ...emailSettings,
      companyId: '65bbe0359f84da3af601f373',
    });
  }

  return (
    <Flex direction="column" p={6} gap={6}>
      <VStack align="start" spacing={4} w="100%">
        <Heading size="md">Customizações</Heading>
        <HStack w="100%">
          <FormControl>
            <FormLabel>Nome do template</FormLabel>
            <Input
              type="text"
              name="name"
              value={emailSettings.email?.name}
              onChange={handleChange}
              width="full"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Categoria</FormLabel>
            <Select
              name="category"
              value={emailSettings.email?.category}
              onChange={handleChange}
            >
              <option value="custom">Custom</option>
              <option value="newsletter">Newsletter</option>
              <option value="transactional">Transacional</option>
            </Select>
          </FormControl>
        </HStack>
        <HStack w="100%">
          <FormControl>
            <FormLabel>Cor de fundo</FormLabel>
            <Input
              type="color"
              name="backgroundColor"
              value={emailSettings.email?.properties.backgroundColor}
              onChange={handleChange}
              width="full"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Cor do texto</FormLabel>
            <Input
              type="color"
              name="textColor"
              value={emailSettings.email?.properties.textColor}
              onChange={handleChange}
              width="full"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Cor da borda</FormLabel>
            <Input
              type="color"
              name="borderColor"
              value={emailSettings.email?.properties.borderColor}
              onChange={handleChange}
              width="full"
            />
          </FormControl>
        </HStack>
        <HStack w="100%">
          <FormControl>
            <FormLabel>Tamanho da fonte</FormLabel>
            <Input
              type="number"
              name="fontSize"
              value={emailSettings.email?.properties.fontSize.replace('px', '')}
              onChange={(e) =>
                handleChange({
                  target: { name: 'fontSize', value: `${e.target.value}px` },
                })
              }
              width="full"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Alinhamento do texto</FormLabel>
            <Select
              name="textAlign"
              value={emailSettings.email?.properties.textAlign}
              onChange={handleChange}
            >
              <option value="left">Esquerda</option>
              <option value="center">Centro</option>
              <option value="right">Direita</option>
            </Select>
          </FormControl>
        </HStack>
        <FormControl>
          <FormLabel>Título</FormLabel>
          <Input
            type="text"
            name="title"
            value={emailSettings.email?.properties.title}
            onChange={handleChange}
            width="full"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Conteúdo</FormLabel>
          <Textarea
            name="content"
            value={emailSettings.email?.properties.content}
            onChange={handleChange}
            rows={5}
            width="full"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Fonte</FormLabel>
          <Select
            name="fontFamily"
            value={emailSettings.email?.properties.fontFamily}
            onChange={handleChange}
          >
            {fontOptions.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </Select>
        </FormControl>
        <HStack w="100%">
          <FormControl>
            <FormLabel>Margem (px)</FormLabel>
            <Input
              type="number"
              name="margin"
              value={emailSettings.email?.properties.margin.replace('px', '')}
              onChange={(e) =>
                handleChange({
                  target: { name: 'margin', value: `${e.target.value}px` },
                })
              }
              width="full"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Padding (px)</FormLabel>
            <Input
              type="number"
              name="padding"
              value={emailSettings.email?.properties.padding.replace('px', '')}
              onChange={(e) =>
                handleChange({
                  target: { name: 'padding', value: `${e.target.value}px` },
                })
              }
              width="full"
            />
          </FormControl>
        </HStack>
        <FormControl>
          <FormLabel>URL da imagem</FormLabel>
          <Input
            type="text"
            name="imageUrl"
            value={emailSettings.email?.properties.imageUrl}
            onChange={handleChange}
            width="full"
          />
        </FormControl>
        <Spacer />
        <Button colorScheme="blue" onClick={handleSave}>
          Salvar Configurações
        </Button>
      </VStack>
      <Box
        bg={emailSettings.email?.properties.backgroundColor}
        color={emailSettings.email?.properties.textColor}
        fontSize={emailSettings.email?.properties.fontSize}
        textAlign={
          emailSettings.email?.properties.textAlign as
            | 'left'
            | 'center'
            | 'right'
        }
        fontFamily={emailSettings.email?.properties.fontFamily}
        p={emailSettings.email?.properties.padding}
        m={`${emailSettings.email?.properties.margin} auto`}
        border={`1px solid ${emailSettings.email?.properties.borderColor}`}
        maxW="600px"
        w="100%"
        borderRadius="md"
      >
        {emailSettings.email?.properties.imageUrl && (
          <Box mb={4}>
            <Image
              src={emailSettings.email?.properties.imageUrl}
              alt="Custom"
              maxW="100%"
            />
          </Box>
        )}
        <Heading as="h1" size="lg" mb={4}>
          {emailSettings.email?.properties.title}
        </Heading>
        <Box>
          {emailSettings.email?.properties.content
            .split('\n')
            .map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
        </Box>
      </Box>
    </Flex>
  );
}

export default EmailCustomizer;
