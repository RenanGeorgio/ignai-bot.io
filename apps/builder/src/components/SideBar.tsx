import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Flex,
  Text,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  Link,
  IconButton,
  IconProps,
  VStack,
  Tooltip
} from '@chakra-ui/react';
import { ChatIcon, ChevronLeftIcon, ChevronRightIcon, FolderIcon, ToolIcon } from './icons';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  router: any
  title: string 
  description?: string 
  active?:  boolean
  navSize: string
}

interface ContentProps {
  tab: string
  navSize: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigate: any
}

interface HoverProps {
  title: string 
  description: string | undefined
}

const SidebarContent = ({ tab, navSize, navigate, ...props }: ContentProps & IconProps) => {
  switch (tab) {
    case 'Home':
      return (
        <Flex alignItems="center" justify="center" onClick={() => navigate.push("/typebots")}>
          <FolderIcon {...props}/>
          <Text ml={5} display={navSize == "small" ? "none" : "flex"}>{tab}</Text>
        </Flex>
      )
    case 'Chat':
      return (
        <Flex alignItems="center" justify="center" onClick={() => navigate.push("/typebots")}>
          <ChatIcon {...props}/>
          <Text ml={5} display={navSize == "small" ? "none" : "flex"}>{tab}</Text>
        </Flex>
      )
    case 'Builder':
      return (
        <Flex alignItems="center" justify="center" onClick={() => navigate.push("/typebots")}>
          <ToolIcon {...props}/>
          <Text ml={5} display={navSize == "small" ? "none" : "flex"}>{tab}</Text>
        </Flex>
      )
    default:
      return null
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        <Heading size="md" fontWeight="normal">{title}</Heading>
        <Text>{description}</Text>
      </Flex>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NavItem = ({ title, description, active, navSize, router }: NavItemProps) => {
  return (
    <Flex
      mt={12} 
      flexDir="column"
      w="100%"
      alignItems={navSize == "small" ? "center" : "flex-start"} 
    >
      <Menu placement="right">
        <Link
          backgroundColor={active ? "rgba(255, 0, 0, 0.9)" : undefined}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: 'none', backgroundColor: "rgba(255, 0, 0, 0.9)", color: "#fff", '& svg': { color: '#fff' } }}
          w={navSize == "large" ? "100%" : "35%"}
        >
          <MenuButton w="100%">
            <SidebarContent tab={title} navSize={navSize} navigate={router} color={active ? "rgba(255, 0, 0, 0.9)" : "gray.500"} />
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
          {/*
          <MenuItem onClick={() => router.push("/typebots")}>
          <NavHoverBox title={title} description={description} />
          </MenuItem>*/}
      </MenuList>
    </Menu>
  </Flex>
  );
} 

const CustomSideBar = () => {
  const router = useRouter();
  const [navSize, changeNavSize] = useState<string>("small");

  return (
    <Flex
      pos="sticky"
      left="2"
      h="95vh"
      marginTop="0.5vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      backgroundColor="rgba(255, 217, 217, 0.8)"
      color="#000"
      borderRadius={navSize == "small" ? "15px" : "30px"}
      w={navSize == "small" ? "56px" : "150px"} 
      flexDir="column"
      justifyContent="space-between"
    >
      <VStack 
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"} 
        spacing='24px'
      >
        <IconButton
          background="none"
          aria-label="Colapse"
          mt={5}
          color="rgba(255, 0, 0, 0.9)" 
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
        <Flex
          p="5%"
          flexDir="column"
          w="100%"
          alignItems={navSize == "small" ? "center" : "flex-start"} 
          as="nav"
        >
          <Tooltip hasArrow label="Builder">
            <NavItem router={router} navSize={navSize} title="Home" description="Pagina inicial da aplicação." />
          </Tooltip>
          <Tooltip hasArrow label="Builder">
            <NavItem router={router} navSize={navSize} title="Chat" description="Conteudo de chat disponivel." />
          </Tooltip>
          <Tooltip hasArrow label="Builder">
            <NavItem router={router} navSize={navSize} title="Builder" description="Construtor de Bot" />
          </Tooltip>
        </Flex>
      </VStack>

      {/*<Flex
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
      </Flex>*/}
    </Flex>
  );
}

export default CustomSideBar