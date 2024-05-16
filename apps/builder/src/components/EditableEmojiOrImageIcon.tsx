import { useRef, RefObject, MutableRefObject } from 'react'
import {
  Popover,
  Tooltip,
  chakra,
  PopoverTrigger,
  PopoverContent,
  Flex,
  useColorModeValue,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter
} from '@chakra-ui/react'
import { EmojiOrImageIcon } from './EmojiOrImageIcon'
import { ImageUploadContent } from './ImageUploadContent'
import { FilePathUploadProps } from '@/features/upload/api/generateUploadUrl'
import { useTranslate } from '@tolgee/react'
import { TypebotInDashboard } from '@/features/dashboard/types'

type Props = {
  uploadFileProps: FilePathUploadProps
  icon?: string | null
  onChangeIcon: (icon: string) => void
  boxSize?: string
}

type DialogProps = {
  typebot: TypebotInDashboard
  isOpen: boolean
  onClose: () => void
  onConfirm: (icon: string) => Promise<unknown> | unknown
}

export const EditableEmojiOrImageIcon = ({
  uploadFileProps,
  icon,
  onChangeIcon,
  boxSize,
}: Props) => {
  const { t } = useTranslate()
  const bg = useColorModeValue('gray.100', 'gray.700')

  return (
    <Popover isLazy>
      {({ onClose }: { onClose: () => void }) => (
        <>
          <Tooltip label={t('editor.header.tooltip.changeIcon.label')}>
            <Flex
              cursor="pointer"
              p="2"
              rounded="md"
              _hover={{
                bg,
              }}
              transition="background-color 0.2s"
              data-testid="editable-icon"
            >
              <PopoverTrigger>
                <chakra.span> 
                  <EmojiOrImageIcon
                    icon={icon}
                    emojiFontSize="2xl"
                    boxSize={boxSize}
                  />
                </chakra.span>
              </PopoverTrigger>
            </Flex>
          </Tooltip>
          <PopoverContent p="2">
            <ImageUploadContent
              uploadFileProps={uploadFileProps}
              defaultUrl={icon ?? ''}
              onSubmit={onChangeIcon}
              excludedTabs={['giphy', 'unsplash']}
              onClose={onClose}
              initialTab="icon"
            />
          </PopoverContent>
        </>
      )}
    </Popover>
  )
}

export const EditDialogEmojiOrImageIcon = ({
  typebot,
  isOpen,
  onClose,
  onConfirm
}: DialogProps) => {
  const { t } = useTranslate()
  const cancelRef: RefObject<unknown> | MutableRefObject<undefined> = useRef(null)

  const onChangeClick = async (icon: string) => {
    try {
      await onConfirm(icon)
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
           {t('editor.header.tooltip.changeIcon.label')}
          </AlertDialogHeader>

          <AlertDialogBody>
            {t('editor.header.tooltip.changeIcon.label')}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {t('cancel')}
            </Button>
            <EditableEmojiOrImageIcon
              uploadFileProps={{
                workspaceId: typebot.workspaceId,
                typebotId: typebot.id,
                fileName: 'icon',
              }}
              icon={typebot?.icon}
              onChangeIcon={onChangeClick}
            />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}