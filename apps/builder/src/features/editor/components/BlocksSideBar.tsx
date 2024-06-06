/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { 
  Stack, 
  HStack,
  Text, 
  SimpleGrid, 
  useEventListener, 
  Portal, 
  Flex, 
  IconButton, 
  Tooltip, 
  Collapse, 
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
import { useDimensions } from '../hooks/useDimensions'

// Integration blocks migrated to forged blocks
const legacyIntegrationBlocks = [
  IntegrationBlockType.OPEN_AI,
  IntegrationBlockType.ZEMANTIC_AI,
]

/*
const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
}*/

export const BlocksSideBar = () => {
  const { t } = useTranslate();
  const { setDraggedBlockType, draggedBlockType } = useBlockDnd();

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [relativeCoordinates, setRelativeCoordinates] = useState({ x: 0, y: 0 });
  const [isLocked, setIsLocked] = useState(true);
  const [isExtended, setIsExtended] = useState(true);
  const [itemSize, setItemSize] = useState(headerHeight);
  const [isExpanded, setIsExpanded] = useState(true);
  const [index, setIndex] = useState(0);

  /*const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure()*/

  const height = useDimensions();

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

  const handleMouseDown = (e: React.MouseEvent, type: BlockV6['type']) => {
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
    if (!isLocked) {
      closeSideBar.flush();
      setIsExtended(true);
    }
  }  

  const handleMouseLeave = () => {
    if (!isLocked) {
      closeSideBar();
    }
  }  

  /*const handleTransform = () => {
    if (isLocked) {
      return
    }

    if (isExtended) {
      setIndex(0);
    } else {
      setIndex(-1);
    }
  }*/

  const handleExpandItem = () => {
    if (isExpanded) {
      const newHeight = height * 0.8;
      setItemSize(newHeight);
    } else {
      setItemSize(headerHeight);
    }

    setIsExpanded(!isExpanded);
  }

  useEffect(() => {
    if (isExtended) {
      setIndex(0);
    } else {
      setIndex(-1);
    }
  },[isExtended]);

  return (
    <Flex
      w={isExtended ? "360px" : "50px"}
      pos="absolute"
      left="0"
      h={`calc(100vh - ${itemSize}px)`}
      zIndex="2"
      pl="4"
      py="4"
      onMouseLeave={handleMouseLeave}
      transition="width 350ms cubic-bezier(0.075, 0.82, 0.165, 1) 0s"
    >
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
        <Accordion 
          defaultIndex={[index]} 
          allowToggle
          onChange={handleExpandItem}
        >
          <AccordionItem>
            <Flex justifyContent="flex-end">
              <HStack>
                <h2>
                  <AccordionButton>
                    <Box as='span' flex='1' textAlign='center'>
                      Componentes
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
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
              </HStack>
            </Flex>

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
          </AccordionItem>
        </Accordion>
      </Stack>
      <Collapse in={!isLocked && !isExtended} unmountOnExit>
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
      </Collapse>
    </Flex>
  );
}