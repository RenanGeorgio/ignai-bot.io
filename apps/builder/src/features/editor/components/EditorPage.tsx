import { useState } from 'react'
import { Seo } from '@/components/Seo'
import { Flex, Spinner, useColorModeValue, HStack, Tooltip, IconButton } from '@chakra-ui/react'
import { useDebouncedCallback } from 'use-debounce'
import { EditorProvider, useEditor, RightPanel as RightPanelEnum } from '../providers/EditorProvider'
import { RedoIcon, UndoIcon } from '@/components/icons'
import { useTypebot } from '../providers/TypebotProvider'
import { BlocksSideBar } from './BlocksSideBar'
import { BoardMenuButton } from './BoardMenuButton'
import { GettingStartedModal } from './GettingStartedModal'
import { PreviewDrawer } from '@/features/preview/components/PreviewDrawer'
import { TypebotHeader } from './TypebotHeader'
import { Graph } from '@/features/graph/components/Graph'
import { GraphDndProvider } from '@/features/graph/providers/GraphDndProvider'
import { GraphProvider } from '@/features/graph/providers/GraphProvider'
import { EventsCoordinatesProvider } from '@/features/graph/providers/EventsCoordinateProvider'
import { TypebotNotFoundPage } from './TypebotNotFoundPage'
import { SuspectedTypebotBanner } from './SuspectedTypebotBanner'
import { useWorkspace } from '@/features/workspace/WorkspaceProvider'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'
import { useTranslate } from '@tolgee/react'

export const EditorPage = () => {
  const { t } = useTranslate()

  const { 
    typebot, 
    currentUserMode, 
    is404,
    canUndo,
    canRedo,
    undo,
    redo
   } = useTypebot()

  const { workspace } = useWorkspace()
  const backgroundImage = useColorModeValue(
    'radial-gradient(#c6d0e1 1px, transparent 0)',
    'radial-gradient(#2f2f39 1px, transparent 0)'
  )

  const bgColor = useColorModeValue('#f4f5f8', 'gray.850')

  const [isRedoShortcutTooltipOpen, setRedoShortcutTooltipOpen] = useState(false)
  const [isUndoShortcutTooltipOpen, setUndoShortcutTooltipOpen] = useState(false)

  const hideUndoShortcutTooltipLater = useDebouncedCallback(() => {
    setUndoShortcutTooltipOpen(false)
  }, 1000)

  const hideRedoShortcutTooltipLater = useDebouncedCallback(() => {
    setRedoShortcutTooltipOpen(false)
  }, 1000)

  const isSuspicious = typebot?.riskLevel === 100 && !workspace?.isVerified

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

  if (is404) {
    return <TypebotNotFoundPage />
  }

  return (
    <EditorProvider>
      <Seo title={typebot?.name ? `${typebot.name} | Editor` : 'Editor'} />
      <Flex overflow="clip" h="100vh" flexDir="column" id="editor-container">
        <GettingStartedModal />
        {isSuspicious && <SuspectedTypebotBanner typebotId={typebot.id} />}
        <TypebotHeader />
        <Flex
          flex="1"
          pos="relative"
          h="full"
          bgColor={bgColor}
          backgroundImage={backgroundImage}
          backgroundSize="40px 40px"
          backgroundPosition="-19px -19px"
        >
          {typebot ? (
            <GraphDndProvider>
              {currentUserMode === 'write' && <BlocksSideBar />}
              <GraphProvider
                isReadOnly={
                  currentUserMode === 'read' || currentUserMode === 'guest'
                }
              > 
                <EventsCoordinatesProvider events={typebot.events}>
                  <Graph flex="1" typebot={typebot} key={typebot.id} /> 
                  <BoardMenuButton
                    pos="absolute"
                    right="40px"
                    top={`calc(20px + ${isSuspicious ? '70px' : '0px'})`}
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
                  <RightPanel />
                </EventsCoordinatesProvider>
              </GraphProvider>
            </GraphDndProvider>
          ) : (
            <Flex justify="center" align="center" boxSize="full">
              <Spinner color="gray" />
            </Flex>
          )}
        </Flex>
      </Flex>
    </EditorProvider>
  )
}

const RightPanel = () => {
  const { rightPanel } = useEditor()
  return rightPanel === RightPanelEnum.PREVIEW ? <PreviewDrawer /> : <></>
}
