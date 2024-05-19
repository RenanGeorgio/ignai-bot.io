/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { 
  Stack, 
  Text, 
  SimpleGrid, 
  useEventListener, 
  Portal, 
  Flex, 
  IconButton, 
  Tooltip, 
  Fade, 
  useColorModeValue, 
  Accordion, 
  AccordionItem, 
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box
} from '@chakra-ui/react'
import { useBlockDnd } from '@/features/graph/providers/GraphDndProvider'
import { BlockCard } from './BlockCard'
import { LockedIcon, UnlockedIcon } from '@/components/icons'
import { BlockCardOverlay } from './BlockCardOverlay'
import { headerHeight } from '../constants'
import { useTranslate } from '@tolgee/react'
import { BubbleBlockType } from '@typebot.io/schemas/features/blocks/bubbles/constants'
import { InputBlockType } from '@typebot.io/schemas/features/blocks/inputs/constants'
import { IntegrationBlockType } from '@typebot.io/schemas/features/blocks/integrations/constants'
import { LogicBlockType } from '@typebot.io/schemas/features/blocks/logic/constants'
import { BlockV6 } from '@typebot.io/schemas'
import { forgedBlockIds } from '@typebot.io/forge-repository/constants'

// Integration blocks migrated to forged blocks
const legacyIntegrationBlocks = [
  IntegrationBlockType.OPEN_AI,
  IntegrationBlockType.ZEMANTIC_AI,
]

export const BlocksSideBar = () => {
  const { t } = useTranslate();
  const { setDraggedBlockType, draggedBlockType } = useBlockDnd();

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [relativeCoordinates, setRelativeCoordinates] = useState({ x: 0, y: 0 });
  const [isLocked, setIsLocked] = useState(true);
  const [isExtended, setIsExtended] = useState(true);

  const closeSideBar = useDebouncedCallback(() => setIsExtended(false), 200)

  const handleMouseMove = (event: MouseEvent) => {
    if (!draggedBlockType) {
      return
    }

    const { clientX, clientY } = event;

    setPosition({
      ...position,
      x: clientX - relativeCoordinates.x,
      y: clientY - relativeCoordinates.y,
    });
  }

  useEventListener('mousemove', handleMouseMove);

  const handleMouseDown = (e: React.MouseEvent, type: BlockV6['type']) => {  // NAO INTERFERE NO MEU OBJETIVO
    const element = e.currentTarget as HTMLDivElement;
    const rect = element.getBoundingClientRect();

    setPosition({ x: rect.left, y: rect.top });
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRelativeCoordinates({ x, y });
    setDraggedBlockType(type);
  }

  const handleMouseUp = () => {
    if (!draggedBlockType) {
      return
    }

    setDraggedBlockType(undefined);

    setPosition({
      x: 0,
      y: 0,
    });
  }

  useEventListener('mouseup', handleMouseUp);

  const handleLockClick = () => setIsLocked(!isLocked);

  const handleDockBarEnter = () => {
    closeSideBar.flush();
    setIsExtended(true);
  }

  const handleMouseLeave = () => {
    if (isLocked) {
      return
    }

    closeSideBar();
  }

  return (
    <Box
      w="380px"
      pos="absolute"
      minH="10%"
      maxH={`calc(100vh - ${headerHeight}px)`}
      left="0"
      zIndex="2"
    >
      <Flex
        w="360px"
        pos="absolute"
        left="0"
        h={`calc(100vh - ${headerHeight}px)`}
        zIndex="3"
        pl="4"
        py="4"
        margin="5px"
        onMouseLeave={handleMouseLeave}
        transform={isExtended ? 'translateY(0)' : 'translateY(-50%)'}
        transition="transform 350ms cubic-bezier(0.075, 0.82, 0.165, 1) 0s"
      >
        <Accordion allowToggle>
          <Stack
            w="full"
            rounded="lg"
            shadow="xl"
            borderWidth="1px"
            pt="2"
            pb="10"
            px="4"
            bgColor={useColorModeValue('white', 'gray.900')}
            spacing={6}
            userSelect="none"
            overflowY="auto"
          >
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as='span' flex='1' textAlign='center'>
                    Componentes
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <Flex justifyContent="flex-end">
                  <Tooltip
                    label={
                      isLocked
                        ? t('editor.sidebarBlocks.sidebar.unlock.label')
                        : t('editor.sidebarBlocks.sidebar.lock.label')
                    }
                  >
                    <IconButton
                      icon={isLocked ? <LockedIcon /> : <UnlockedIcon />}
                      aria-label={
                        isLocked
                          ? t('editor.sidebarBlocks.sidebar.icon.unlock.label')
                          : t('editor.sidebarBlocks.sidebar.icon.lock.label')
                      }
                      size="sm"
                      onClick={handleLockClick}
                    />
                  </Tooltip>
                </Flex>
              </h2>
              <AccordionPanel>
                <Stack>
                  <Text fontSize="sm" fontWeight="semibold">
                    {t('editor.sidebarBlocks.blockType.bubbles.heading')}
                  </Text>
                  <SimpleGrid columns={2} spacing="3">
                    {Object.values(BubbleBlockType).map((type) => (
                      <BlockCard key={type} type={type} onMouseDown={handleMouseDown} />
                    ))}
                  </SimpleGrid>
                </Stack>

                <Stack>
                  <Text fontSize="sm" fontWeight="semibold">
                    {t('editor.sidebarBlocks.blockType.inputs.heading')}
                  </Text>
                  <SimpleGrid columns={2} spacing="3">
                    {Object.values(InputBlockType).map((type) => (
                      <BlockCard key={type} type={type} onMouseDown={handleMouseDown} />
                    ))}
                  </SimpleGrid>
                </Stack>

                <Stack>
                  <Text fontSize="sm" fontWeight="semibold">
                    {t('editor.sidebarBlocks.blockType.logic.heading')}
                  </Text>
                  <SimpleGrid columns={2} spacing="3">
                    {Object.values(LogicBlockType).map((type) => (
                      <BlockCard key={type} type={type} onMouseDown={handleMouseDown} />
                    ))}
                  </SimpleGrid>
                </Stack>

                <Stack>
                  <Text fontSize="sm" fontWeight="semibold">
                    {t('editor.sidebarBlocks.blockType.integrations.heading')}
                  </Text>
                  <SimpleGrid columns={2} spacing="3">
                    {Object.values(IntegrationBlockType)
                      .concat(forgedBlockIds as any)
                      .filter((type) => !legacyIntegrationBlocks.includes(type))
                      .map((type) => (
                        <BlockCard
                          key={type}
                          type={type}
                          onMouseDown={handleMouseDown}
                        />
                      ))}
                  </SimpleGrid>
                </Stack>

                {draggedBlockType && (
                  <Portal>
                    <BlockCardOverlay
                      type={draggedBlockType}
                      onMouseUp={handleMouseUp}
                      pos="fixed"
                      top="0"
                      left="0"
                      style={{
                        transform: `translate(${position.x}px, ${position.y}px) rotate(-2deg)`,
                      }}
                    />
                  </Portal>
                )}
              </AccordionPanel>
              <Fade in={!isLocked} unmountOnExit>
                <Flex
                  pos="absolute"
                  h="100%"
                  right="-70px"
                  w="450px"
                  top="0"
                  justify="flex-end"
                  pr="10"
                  align="center"
                  onMouseEnter={handleDockBarEnter}
                  zIndex={-1}
                >
                  <Flex w="5px" h="20px" bgColor="gray.400" rounded="md" />
                </Flex>
              </Fade>
            </AccordionItem>
          </Stack>
        </Accordion> 
      </Flex>
    </Box> 
  );
}