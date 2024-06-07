import React, { useState } from 'react'
import {
  Flex,
  Text,
  Divider,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  Link,
  IconButton,
  IconProps
} from '@chakra-ui/react'
import { ChatIcon, ChevronLeftIcon, ChevronRightIcon, FolderIcon, ToolIcon } from './icons'

type CustomHTMLDivElement = Omit<HTMLDivElement, "removeEventListener" | "addEventListener">;

interface FocusableElement extends HTMLButtonElement, CustomHTMLDivElement {
  focus(options?: FocusOptions): void
}

type CustomElement =
  | FocusableElement
  | HTMLButtonElement
  | HTMLDivElement;

export interface Props {
  btn?: React.MutableRefObject<CustomElement> | React.RefObject<CustomElement>
  onClose?: () => void
  isOpen?: boolean
  variant?: string | undefined
}

interface NavItemProps {
  title: string 
  description?: string 
  active?:  boolean
  navSize: string
}

interface HoverProps {
  title: string 
  description: string | undefined
}

const SidebarContent = ({ tab, ...props }: { tab: string } & IconProps) => {
  switch (tab) {
    case 'Home':
      return <FolderIcon {...props}/>
    case 'Chat':
      return <ChatIcon {...props}/>
    case 'Builder':
      return <ToolIcon {...props}/>
    default:
      return null
  }
}

const NavHoverBox = ({ title, description }: HoverProps) => {
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
        <SidebarContent tab={title} fontSize="3xl" mb={4} />
        <Heading size="md" fontWeight="normal">{title}</Heading>
        <Text>{description}</Text>
      </Flex>
    </>
  );
}

const NavItem = ({ title, description, active, navSize }: NavItemProps) => {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize == "small" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <Link
          backgroundColor={active ? "#AEC8CA" : undefined}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: 'none', backgroundColor: "#AEC8CA" }}
          w={navSize == "large" ? "100%" : "35%"} // VERIFICAR
        >
          <MenuButton w="100%">
            <Flex>
              <SidebarContent tab={title} color={active ? "#82AAAD" : "gray.500"} />
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
          <NavHoverBox title={title} description={description} />
      </MenuList>
    </Menu>
  </Flex>
  );
}

const CustomSideBar = () => {
  const [navSize, changeNavSize] = useState<string>("large");
  return (
    <Flex
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
          aria-label="Colapse"
          mt={5}
          _hover={{ background: 'none' }}
          icon={navSize == "small" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          onClick={() => {
            if (navSize == "small") {
              changeNavSize("large")
            } else {
              changeNavSize("small")
            }
          }}
        />
        <NavItem navSize={navSize} title="Home" description="Pagina inicial da aplicação." />
        <NavItem navSize={navSize} title="Chat" description="Conteudo de chat disponivel." />
        <NavItem navSize={navSize} title="Builder" description="Construtor de Bot" />
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

export default CustomSideBar