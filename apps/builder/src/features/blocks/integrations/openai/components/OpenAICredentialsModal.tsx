import { TextInput } from '@/components/inputs/TextInput'
import { TextLink } from '@/components/TextLink'
import { useWorkspace } from '@/features/workspace/WorkspaceProvider'
import { useToast } from '@/hooks/useToast'
import { trpc } from '@/lib/trpc'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  ModalFooter,
  Button,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import React, { useState } from 'react'

const openAITokensPage = 'https://platform.openai.com/account/api-keys'

type Props = {
  isOpen: boolean
  onClose: () => void
  onNewCredentials: (id: string) => void
}

export const OpenAICredentialsModal = ({
  isOpen,
  onClose,
  onNewCredentials,
}: Props) => {
  const { workspace } = useWorkspace();
  const { showToast } = useToast();

  const [apiKey, setApiKey] = useState('');
  const [name, setName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const {
    credentials: {
      listCredentials: { refetch: refetchCredentials },
    },
  } = trpc.useContext();

  const { mutate } = trpc.credentials.createCredentials.useMutation({
    onMutate: () => setIsCreating(true),
    onSettled: () => setIsCreating(false),
    onError: (err) => {
      showToast({
        description: err.message,
        status: 'error',
      })
    },
    onSuccess: (data) => {
      refetchCredentials()
      onNewCredentials(data.credentialsId)
      onClose()
    },
  });

  const createOpenAICredentials = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!workspace) {
      return
    }

    mutate({
      credentials: {
        type: 'openai',
        workspaceId: workspace.id,
        name,
        data: {
          apiKey,
        },
      },
    });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar conta OpenAI</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={createOpenAICredentials}>
          <ModalBody as={Stack} spacing="6">
            <TextInput
              isRequired
              label="Name"
              onChange={setName}
              placeholder="Minha conta"
              withVariableButton={false}
              debounceTimeout={0}
            />
            <TextInput
              isRequired
              type="password"
              label="API key"
              helperText={
                <>
                  Você pode gerar uma chave de API{' '}
                  <TextLink href={openAITokensPage} isExternal>
                    aqui
                  </TextLink>
                  .
                </>
              }
              onChange={setApiKey}
              placeholder="sk-..."
              withVariableButton={false}
              debounceTimeout={0}
            />
            <Alert status="warning">
              <AlertIcon />
              Certifique-se de adicionar uma forma de pagamento à sua conta OpenAI.
              Caso contrário, não funcionará após algumas mensagens.
            </Alert>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              isLoading={isCreating}
              isDisabled={apiKey === '' || name === ''}
              colorScheme="red"
            >
              Criar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}