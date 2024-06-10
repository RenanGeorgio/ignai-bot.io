import {
  Box,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  VStack,
} from '@chakra-ui/react'
import Link from 'next/link'

interface Props {
  onClose: () => void
  isOpen: boolean
  variant: string | undefined
}

const CustomSideBar = ({ isOpen, variant, onClose }: Props) => {
  return variant === 'sidebar' ? (
    <Box
      position="fixed"
      left={0}
      p={5}
      w="200px"
      top={0}
      h="100%"
      bg="#dfdfdf"
    >
      <SidebarContent onClick={onClose} />
    </Box>
  ) : (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Ignai-Bot</DrawerHeader>
          <DrawerBody>
            <SidebarContent onClick={onClose} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

const SidebarContent = ({ onClick }: { onClick: () => void }) => (
  <VStack>
    <Button onClick={onClick} w="100%">
      Home
    </Button>
    <Button onClick={onClick} w="100%">
      Builder
    </Button>
    <Button onClick={onClick} w="100%">
      Contact
    </Button>
    <Link href={'/typebots/results'}>
      All Results
    </Link>
  </VStack>
)

export default CustomSideBar