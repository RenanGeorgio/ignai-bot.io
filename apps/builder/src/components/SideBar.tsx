import React from 'react'
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  VStack,
} from '@chakra-ui/react'

interface FocusableElement {
  focus(options?: FocusOptions): void
}

interface Props {
  btn: React.MutableRefObject<FocusableElement | HTMLButtonElement | undefined> | React.RefObject<FocusableElement | HTMLButtonElement | undefined>
  onClose: () => void
  isOpen: boolean
  variant?: string | undefined
}

const CustomSideBar = ({ btn, isOpen, onClose }: Props) => {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btn}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Ignai-Bot</DrawerHeader>
        <DrawerBody>
          <SidebarContent onClick={onClose} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

const SidebarContent = ({ onClick }: { onClick: () => void }) => (
  <VStack>
    <Button onClick={onClick} w="100%">
      Home
    </Button>
    <Button onClick={onClick} w="100%">
      About
    </Button>
    <Button onClick={onClick} w="100%">
      Contact
    </Button>
  </VStack>
)

export default CustomSideBar