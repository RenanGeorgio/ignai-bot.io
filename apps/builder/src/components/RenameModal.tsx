import { useRef, RefObject, MutableRefObject } from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'
import { useTranslate } from '@tolgee/react'
import { TextInput } from '@/components/inputs'
import { TypebotInDashboard } from '@/features/dashboard/types'

type ConfirmRenameModalProps = {
  typebot: TypebotInDashboard
  isOpen: boolean
  onConfirm: (name: string) => Promise<unknown> | unknown
  onClose: () => void
}

export const RenameModal = ({
  typebot,
  isOpen,
  onClose,
  onConfirm
}: ConfirmRenameModalProps) => { 
  const { t } = useTranslate()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cancelRef: RefObject<any> | MutableRefObject<undefined> = useRef(null)

  const onChangeClick = async (name: string) => {
    try {
      await onConfirm(name)
    } catch (e) {
      return null
    }
    onClose()
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            {t('rename')}
          </AlertDialogHeader>

          <AlertDialogBody>
            {t('workspace.settings.name.label')}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {t('cancel')}
            </Button>
            <TextInput
              withVariableButton={false}
              defaultValue={typebot?.name}
              onChange={onChangeClick}
            />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}