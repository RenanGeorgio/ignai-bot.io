import { TextInput } from '@/components/inputs'
import { useTypebot } from '@/features/editor/providers/TypebotProvider'
import { useToast } from '@/hooks/useToast'
import { trpc } from '@/lib/trpc'
import {
  Alert,
  AlertIcon,
  Button,
  HStack,
  Link,
  SlideFade,
  Stack,
  StackProps,
  Text,
} from '@chakra-ui/react'
import { isEmpty } from '@typebot.io/lib'
import { FormEvent, useState } from 'react'
import {
  getPhoneNumberFromLocalStorage,
  setPhoneNumberInLocalStorage,
} from '../helpers/phoneNumberFromLocalStorage'
import { useEditor } from '@/features/editor/providers/EditorProvider'
import { BuoyIcon, ExternalLinkIcon } from '@/components/icons'

export const WhatsAppPreviewInstructions = (props: StackProps) => {
  const { typebot, save } = useTypebot()
  const { startPreviewAtGroup, startPreviewAtEvent } = useEditor()
  const [phoneNumber, setPhoneNumber] = useState(
    getPhoneNumberFromLocalStorage() ?? ''
  )
  const [isSendingMessage, setIsSendingMessage] = useState(false)
  const [isMessageSent, setIsMessageSent] = useState(false)
  const [hasMessageBeenSent, setHasMessageBeenSent] = useState(false)

  const { showToast } = useToast()
  const { mutate } = trpc.whatsApp.startWhatsAppPreview.useMutation({
    onMutate: () => setIsSendingMessage(true),
    onSettled: () => setIsSendingMessage(false),
    onError: (error) => showToast({ description: error.message }),
    onSuccess: async (data) => {
      if (
        data?.message === 'success' &&
        phoneNumber !== getPhoneNumberFromLocalStorage()
      )
        setPhoneNumberInLocalStorage(phoneNumber)
      setHasMessageBeenSent(true)
      setIsMessageSent(true)
      setTimeout(() => setIsMessageSent(false), 30000)
    },
  })

  const sendWhatsAppPreviewStartMessage = async (e: FormEvent) => {
    e.preventDefault()
    if (!typebot) return
    await save()
    mutate({
      to: phoneNumber,
      typebotId: typebot.id,
      startFrom: startPreviewAtGroup
        ? { type: 'group', groupId: startPreviewAtGroup }
        : startPreviewAtEvent
        ? { type: 'event', eventId: startPreviewAtEvent }
        : undefined,
    })
  }

  return (
    <Stack
      as="form"
      spacing={4}
      overflowY="auto"
      w="full"
      px="1"
      onSubmit={sendWhatsAppPreviewStartMessage}
      {...props}
    >
      <HStack justifyContent="flex-end">
        <Text fontSize="sm">Precisa de ajuda?</Text>
        <Button
          as={Link}
          href="https://docs.ignaibot.com/deploy/whatsapp/overview"
          leftIcon={<BuoyIcon />}
          size="sm"
        >
          Verifique a documentação
        </Button>
      </HStack>
      <TextInput
        label="Your phone number"
        placeholder="+XXXXXXXXXXXX"
        type="tel"
        withVariableButton={false}
        debounceTimeout={0}
        defaultValue={phoneNumber}
        onChange={setPhoneNumber}
      />
      {!isMessageSent && (
        <Button
          isDisabled={isEmpty(phoneNumber) || isMessageSent}
          isLoading={isSendingMessage}
          type="submit"
          colorScheme="red"
        >
          {hasMessageBeenSent ? 'Restart' : 'Start'} o chat
        </Button>
      )}
      <SlideFade offsetY="20px" in={isMessageSent} unmountOnExit>
        <Stack>
          <Button
            as={Link}
            href={`https://web.whatsapp.com/`}
            isExternal
            colorScheme="red"
            rightIcon={<ExternalLinkIcon />}
          >
            Abrir WhatsApp Web
          </Button>
          <Alert status="success" w="100%">
            <HStack>
              <AlertIcon />
              <Stack spacing={1}>
                <Text fontWeight="semibold">Chat Iniciado!</Text>
                <Text fontSize="sm">
                  A primeira mensagem pode levar até 2 minutos para ser entregue.
                </Text>
              </Stack>
            </HStack>
          </Alert>
        </Stack>
      </SlideFade>
    </Stack>
  );
}