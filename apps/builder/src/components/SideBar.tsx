import React, { useState } from 'react'
import {
  Flex,
  IconProps,
  Text,
  Divider,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  Link,
  Icon,
  IconButton
} from '@chakra-ui/react'
import { ChevronRightIcon } from './icons'

type CustomHTMLDivElement = Omit<HTMLDivElement, "removeEventListener" | "addEventListener">;

interface FocusableElement extends HTMLButtonElement, CustomHTMLDivElement {
  focus(options?: FocusOptions): void
}

type CustomElement =
  | FocusableElement
  | HTMLButtonElement
  | HTMLDivElement;

interface Props {
  btn: React.MutableRefObject<CustomElement> | React.RefObject<CustomElement>
  onClose: () => void
  isOpen: boolean
  variant?: string | undefined
}

interface NavItemProps {
  icon: (props: IconProps) => JSX.Element
  title: string 
  description?: string 
  active?:  boolean
  navSize: string
}

interface HoverProps {
  title: string 
  icon: (props: IconProps) => JSX.Element
  description: string
}

/*
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

export default CustomSideBar*/


const CustomSideBar = ({ btn, isOpen, onClose }: Props) => {
  const [navSize, changeNavSize] = useState<string>("large");
  return (
    <Flex
      ref={btn as React.RefObject<HTMLDivElement>}
      pos="sticky"
      left="5"
      h="95vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius={navSize == "small" ? "15px" : "30px"}
      w={navSize == "small" ? "75px" : "200px"}
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        as="nav"
      >
        <IconButton
          background="none"
          mt={5}
          _hover={{ background: 'none' }}
          icon={<ChevronRightIcon />}
          onClick={() => {
            if (!isOpen) {
              changeNavSize("large")
            } else {
              changeNavSize("small")
              onClose()
            }
          }}
        />
        <NavItem navSize={navSize} icon={<ChevronRightIcon />} title="Dashboard" description="This is the description for the dashboard." />
        <NavItem navSize={navSize} icon={<ChevronRightIcon />} title="Calendar" active />
        <NavItem navSize={navSize} icon={<ChevronRightIcon />} title="Clients" />
      </Flex>

      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        mb={4}
      >
        <Divider display={navSize == "small" ? "none" : "flex"} />
        <Flex mt={4} align="center">
          <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
            <Heading as="h3" size="sm">Sylwia Weller</Heading>
            <Text color="gray">Admin</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

const NavItem = ({ icon, title, description, active, navSize }: NavItemProps) => {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize == "small" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <Link
          backgroundColor={active && "#AEC8CA"}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: 'none', backgroundColor: "#AEC8CA" }}
          w={navSize == "large" && "100%"}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon as={icon} fontSize="xl" color={active ? "#82AAAD" : "gray.500"} />
              <Text ml={5} display={navSize == "small" ? "none" : "flex"}>{title}</Text>
            </Flex>
          </MenuButton>
        </Link>
        <MenuList
          py={0}
          border="none"
          w={200}
          h={200}
          ml={5}
        >
          <NavHoverBox title={title} icon={icon} description={description} />
      </MenuList>
    </Menu>
  </Flex>
  );
}

const NavHoverBox = ({ title, icon, description }: HoverProps) => {
  return (
    <>
      <Flex
        pos="absolute"
        mt="calc(100px - 7.5px)"
        ml="-10px"
        width={0}
        height={0}
        borderTop="10px solid transparent"
        borderBottom="10px solid transparent"
        borderRight="10px solid #82AAAD"
      />
      <Flex
        h={200}
        w="100%"
        flexDir="column"
        alignItems="center"
        justify="center"
        backgroundColor="#82AAAD"
        borderRadius="10px"
        color="#fff"
        textAlign="center"
      >
        <Icon as={icon} fontSize="3xl" mb={4} />
        <Heading size="md" fontWeight="normal">{title}</Heading>
        <Text>{description}</Text>
      </Flex>
    </>
  );
}

export default CustomSideBar