import React, { useState } from 'react'
import { Stack, HStack, Avatar, Text, Tooltip } from '@chakra-ui/react'
import { UploadIcon } from '@/components/icons'
import { ApiTokensList } from './ApiTokensList'
import { UploadButton } from '@/components/ImageUploadContent/UploadButton'
import { useUser } from '../hooks/useUser'
import { TextInput } from '@/components/inputs/TextInput'
import { useTranslate } from '@tolgee/react'
import { WhatsAppLogo } from '@/components/logos/WhatsAppLogo'
import { FacebookLogo } from '@/components/logos/FacebookLogo'

export const MyAccountForm = () => {
  const { t } = useTranslate();

  const { user, updateUser } = useUser();

  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [tel, setTel] = useState('+55 (27) 99297-4993');
  const [company, setCompany] = useState(user?.company ?? '');
  const [role, setRole] = useState('contribuinte');

  const handleFileUploaded = async (url: string) => {
    updateUser({ image: url });
  }

  const handleNameChange = (newName: string) => {
    setName(newName);
    updateUser({ name: newName });
  }

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
    updateUser({ email: newEmail });
  }

  const handleTelChange = (newTel: string) => {
    setTel(newTel);
    //updateUser({ tel: newTel });
  }
  
  const handleCompanyChange = (newCompany: string) => {
    setCompany(newCompany);
    updateUser({ company: newCompany });
  }
  
  const handleRoleChange = (newRole: string) => {
    setRole(newRole);
    //updateUser({ role: newRole });
  }

  return (
    <Stack spacing="6" w="full" overflowY="auto">
      <HStack spacing={6}>
        <Avatar
          size="lg"
          src={user?.image ?? undefined}
          name={user?.name ?? undefined}
        />
        <Stack>
          {user?.id && (
            <UploadButton
              size="sm"
              fileType="image"
              filePathProps={{
                userId: user.id,
                fileName: 'avatar',
              }}
              leftIcon={<UploadIcon />}
              onFileUploaded={handleFileUploaded}
            >
              {t('account.myAccount.changePhotoButton.label')}
            </UploadButton>
          )}
          <Text color="gray.500" fontSize="sm">
            {t('account.myAccount.changePhotoButton.specification')}
          </Text>
        </Stack>
      </HStack>
      <TextInput
        defaultValue={name}
        onChange={handleNameChange}
        label={t('account.myAccount.nameInput.label')}
        withVariableButton={false}
        debounceTimeout={0}
      />
      <HStack spacing={6}>
        <TextInput
          defaultValue={company}
          onChange={handleCompanyChange}
          label={'Empresa:'}
          withVariableButton={false}
          debounceTimeout={0}
          isDisabled
        />
        <TextInput
          defaultValue={role}
          onChange={handleRoleChange}
          label={'Cargo:'}
          withVariableButton={false}
          debounceTimeout={0}
          isDisabled
        />
      </HStack> 
      <Tooltip label={t('account.myAccount.emailInput.disabledTooltip')}>
        <span>
          <TextInput
            type="email"
            defaultValue={email}
            onChange={handleEmailChange}
            label={t('account.myAccount.emailInput.label')}
            withVariableButton={false}
            debounceTimeout={0}
            isDisabled
          />
        </span>
      </Tooltip>
      <Tooltip label={'Fazer a atualização para o seu numero não esta disponivel no momento'}>
        <span>
          <TextInput
            type="tel"
            defaultValue={tel}
            onChange={handleTelChange}
            label={'N° registrado:'}
            withVariableButton={false}
            debounceTimeout={0}
            isDisabled
          />
        </span>
      </Tooltip>
      <HStack>
        <WhatsAppLogo />
        <FacebookLogo />
      </HStack>
      {user && <ApiTokensList user={user} />}
    </Stack>
  );
}