import {
  Flex,
  HStack,
  Stack,
  Button,
  IconButton,
  Tooltip,
  Spinner,
  Text,
  useColorModeValue,
  useDisclosure,
  StackProps,
  chakra,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'
import {
  BuoyIcon,
  ChevronLeftIcon,
  CopyIcon,
  PlayIcon,
  RedoIcon,
  UndoIcon
} from '@/components/icons'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { isDefined, isNotDefined } from '@typebot.io/lib'
import Link from 'next/link'
import { useDebouncedCallback } from 'use-debounce'
import { PublishButton } from '@/features/publish/components/PublishButton'
import { useUser } from '@/features/account/hooks/useUser'
import { headerHeight } from '../constants'
import { RightPanel, useEditor } from '../providers/EditorProvider'
import { useTypebot } from '../providers/TypebotProvider'
import { SupportBubble } from '@/components/SupportBubble'
import { isCloudProdInstance } from '@/helpers/isCloudProdInstance'
import { useTranslate } from '@tolgee/react'
import { GuestTypebotHeader } from './UnauthenticatedTypebotHeader'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'
import { useWorkspace } from '@/features/workspace/WorkspaceProvider'
import { Plan } from '@typebot.io/prisma'

export const TypebotHeader = () => {
  const { typebot, publishedTypebot, currentUserMode } = useTypebot()
  const { workspace } = useWorkspace()

  const { isOpen, onOpen } = useDisclosure()
  const headerBgColor = useColorModeValue('white', 'gray.900')

  const handleHelpClick = () => {
    isCloudProdInstance() && workspace?.plan && workspace.plan !== Plan.FREE
      ? onOpen()
      : window.open('https://docs.ignaibot.com/guides/how-to-get-help', '_blank')
  }

  if (currentUserMode === 'guest') {
    return <GuestTypebotHeader />
  }

  return (
    <Flex
      w="full"
      borderBottomWidth="1px"
      justify="center"
      align="center"
      h={`${headerHeight}px`}
      zIndex={100}
      pos="relative"
      bgColor={headerBgColor}
      flexShrink={0}
    >
      <LeftElements pos="absolute" left="1rem" />
      <TypebotNav
        display={{ base: 'none', xl: 'flex' }}
        pos={{ base: 'absolute' }}
        typebotId={typebot?.id}
        isResultsDisplayed={isDefined(publishedTypebot)}
      />
      <HStack spacing='24px'>
        <RightElements
          pos="absolute"
          margin="10"
          right="6rem"
          justifyContent="center"
          alignContent="center"
          display={['none', 'flex']}
          isResultsDisplayed={isDefined(publishedTypebot)}
        />
        {isOpen && <SupportBubble autoShowDelay={0} />}
        <LatestElements pos="absolute" right="1.5rem" onHelpClick={handleHelpClick}/>
      </HStack>
    </Flex>
  );
}

const LeftElements = ({ ...props }: StackProps) => {
  const { t } = useTranslate()
  const router = useRouter()

  const {
    typebot,
    canUndo,
    canRedo,
    undo,
    redo,
    currentUserMode,
    isSavingLoading,
  } = useTypebot()

  const [isRedoShortcutTooltipOpen, setRedoShortcutTooltipOpen] = useState(false)
  const [isUndoShortcutTooltipOpen, setUndoShortcutTooltipOpen] = useState(false)

  const hideUndoShortcutTooltipLater = useDebouncedCallback(() => {
    setUndoShortcutTooltipOpen(false)
  }, 1000)

  const hideRedoShortcutTooltipLater = useDebouncedCallback(() => {
    setRedoShortcutTooltipOpen(false)
  }, 1000)

  useKeyboardShortcuts({
    undo: () => {
      if (!canUndo) {
        return
      }

      hideUndoShortcutTooltipLater.flush()
      setUndoShortcutTooltipOpen(true)
      hideUndoShortcutTooltipLater()
      undo()
    },
    redo: () => {
      if (!canRedo) {
        return
      }

      hideUndoShortcutTooltipLater.flush()
      setRedoShortcutTooltipOpen(true)
      hideRedoShortcutTooltipLater()
      redo()
    },
  })

  return (
    <HStack justify="center" align="center" spacing="6" {...props}>
      <HStack alignItems="center" spacing={3}>
        <IconButton
          as={Link}
          aria-label="Navigate back"
          icon={<ChevronLeftIcon fontSize={25} />}
          href={{
            pathname: router.query.parentId
              ? '/bots/[typebotId]/edit'
              : typebot?.folderId
              ? '/bots/folders/[id]'
              : '/bots',
            query: {
              id: typebot?.folderId ?? [],
              parentId: Array.isArray(router.query.parentId)
                ? router.query.parentId.slice(0, -1)
                : [],
              typebotId: Array.isArray(router.query.parentId)
                ? [...router.query.parentId].pop()
                : router.query.parentId ?? [],
            },
          }}
          size="sm"
        />
        {currentUserMode === 'write' && (
          <HStack>
            <Tooltip
              label={
                isUndoShortcutTooltipOpen
                  ? t('editor.header.undo.tooltip.label')
                  : t('editor.header.undoButton.label')
              }
              isOpen={isUndoShortcutTooltipOpen ? true : undefined}
              hasArrow={isUndoShortcutTooltipOpen}
            >
              <IconButton
                display={['none', 'flex']}
                icon={<UndoIcon />}
                size="sm"
                aria-label={t('editor.header.undoButton.label')}
                onClick={undo}
                isDisabled={!canUndo}
              />
            </Tooltip>
            <Tooltip
              label={
                isRedoShortcutTooltipOpen
                  ? t('editor.header.undo.tooltip.label')
                  : t('editor.header.redoButton.label')
              }
              isOpen={isRedoShortcutTooltipOpen ? true : undefined}
              hasArrow={isRedoShortcutTooltipOpen}
            >
              <IconButton
                display={['none', 'flex']}
                icon={<RedoIcon />}
                size="sm"
                aria-label={t('editor.header.redoButton.label')}
                onClick={redo}
                isDisabled={!canRedo}
              />
            </Tooltip>
          </HStack>
        )}
      </HStack>
      {isSavingLoading && (
        <HStack>
          <Spinner speed="0.7s" size="sm" color="gray.400" />
          <Text fontSize="sm" color="gray.400">
            {t('editor.header.savingSpinner.label')}
          </Text>
        </HStack>
      )}
    </HStack>
  );
}

const RightElements = ({ 
  isResultsDisplayed,
  ...props 
}: StackProps & { isResultsDisplayed: boolean }) => {
  const { t } = useTranslate()

  const router = useRouter()
  const { typebot, currentUserMode, save, isSavingLoading } = useTypebot()

  const {
    setRightPanel,
    rightPanel,
    setStartPreviewAtGroup,
    setStartPreviewAtEvent,
  } = useEditor()

  const handlePreviewClick = async () => {
    setStartPreviewAtGroup(undefined)
    setStartPreviewAtEvent(undefined)

    await save()

    setRightPanel(RightPanel.PREVIEW)
  }

  return (
    <HStack {...props}>
      <TypebotNav
        display={{ base: 'none', md: 'flex', xl: 'none' }}
        typebotId={typebot?.id}
        isResultsDisplayed={isResultsDisplayed}
      />
      {router.pathname.includes('/edit') && isNotDefined(rightPanel) && (
        <Button
          colorScheme="gray"
          onClick={handlePreviewClick}
          isLoading={isNotDefined(typebot) || isSavingLoading}
          leftIcon={<PlayIcon />}
          size="sm"
          iconSpacing={{ base: 0, xl: 2 }}
        >
          <chakra.span display={{ base: 'none', xl: 'inline' }}>
            {t('editor.header.previewButton.label')}
          </chakra.span>
        </Button>
      )}
      {currentUserMode === 'guest' && (
        <Button
          as={Link}
          href={`/bots/${typebot?.id}/duplicate`}
          leftIcon={<CopyIcon />}
          isLoading={isNotDefined(typebot)}
          size="sm"
        >
          Duplicar
        </Button>
      )}
      {currentUserMode === 'write' && <PublishButton size="sm" />}
    </HStack>
  );
}

const LatestElements = ({
  onHelpClick,
  ...props
}: StackProps & { onHelpClick: () => void }) => {
  const { t } = useTranslate()
  const { user } = useUser()

  return (
    <HStack {...props}>
      <Stack alignItems="center" spacing={3}>
        <Menu>
          <MenuButton
            isRound={true}
            as={IconButton}
            aria-label='Options'
            size='2xs'
            icon={<Avatar pos='absolute' size='2xs' border='1px solid gray' w={8} h={8} src={user?.image ?? undefined} name={user?.name ?? undefined} />}
            variant='solid'
          />
          <MenuList>
            <MenuItem icon={<BuoyIcon />} onClick={onHelpClick}>
              <chakra.span display={{ base: 'none', xl: 'inline' }}>
                {t('editor.header.helpButton.label')}
              </chakra.span>
            </MenuItem>
          </MenuList>
        </Menu>
      </Stack>
    </HStack>
  );
}

const TypebotNav = ({
  typebotId,
  isResultsDisplayed,
  ...stackProps
}: {
  typebotId?: string
  isResultsDisplayed: boolean
} & StackProps) => {
  const { t } = useTranslate()
  const router = useRouter()

  return (
    <HStack {...stackProps}>
      <Button
        as={Link}
        href={`/bots/${typebotId}/edit`}
        colorScheme={router.pathname.includes('/edit') ? 'red' : 'gray'}
        variant={router.pathname.includes('/edit') ? 'outline' : 'ghost'}
        size="sm"
      >
        {t('editor.header.flowButton.label')}
      </Button>
      <Button
        as={Link}
        href={`/bots/${typebotId}/theme`}
        colorScheme={router.pathname.endsWith('theme') ? 'red' : 'gray'}
        variant={router.pathname.endsWith('theme') ? 'outline' : 'ghost'}
        size="sm"
      >
        {t('editor.header.themeButton.label')}
      </Button>
      <Button
        as={Link}
        href={`/bots/${typebotId}/settings`}
        colorScheme={router.pathname.endsWith('settings') ? 'red' : 'gray'}
        variant={router.pathname.endsWith('settings') ? 'outline' : 'ghost'}
        size="sm"
      >
        {t('editor.header.settingsButton.label')}
      </Button>
      <Button
        as={Link}
        href={`/bots/${typebotId}/share`}
        colorScheme={router.pathname.endsWith('share') ? 'red' : 'gray'}
        variant={router.pathname.endsWith('share') ? 'outline' : 'ghost'}
        size="sm"
      >
        {t('share.button.label')}
      </Button>
      {isResultsDisplayed && (
        <Button
          as={Link}
          href={`/bots/${typebotId}/results`}
          colorScheme={router.pathname.includes('results') ? 'red' : 'gray'}
          variant={router.pathname.includes('results') ? 'outline' : 'ghost'}
          size="sm"
        >
          {t('editor.header.resultsButton.label')}
        </Button>
      )}
    </HStack>
  );
}