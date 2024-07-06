import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Flex,
  Text,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  Link,
  IconButton,
  IconProps,
  VStack,
  Tooltip
} from '@chakra-ui/react';
import { ChatIcon, ChevronLeftIcon, ChevronRightIcon, FolderIcon, PhoneIcon, ToolIcon, UserIcon, EmailIcon } from './icons';
import { useUser } from '@/features/account/hooks/useUser';

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
  path: string
  title: string 
  description?: string 
  active?:  boolean
  navSize: string
}

interface ContentProps {
  tab: string
  navSize: string
}

interface HoverProps {
  title: string 
  description: string | undefined
}

const SidebarContent = ({ tab, navSize, ...props }: ContentProps & IconProps) => {
  switch (tab) {
    case 'Home':
      return (
        <Flex alignItems="center" justify="center">
          <FolderIcon {...props}/>
          <Text ml={5} display={navSize == "small" ? "none" : "flex"}>{tab}</Text>
        </Flex>
      )
    case 'Chat':
      return (
        <Flex alignItems="center" justify="center">
          <ChatIcon {...props}/>
          <Text ml={5} display={navSize == "small" ? "none" : "flex"}>{tab}</Text>
        </Flex>
      )
    case 'Builder':
      return (
        <Flex alignItems="center" justify="center">
          <ToolIcon {...props}/>
          <Text ml={5} display={navSize == "small" ? "none" : "flex"}>{tab}</Text>
        </Flex>
      )
    case 'Channels':
      return (
        <Flex alignItems="center" justify="center">
          <PhoneIcon {...props}/>
          <Text ml={5} display={navSize == "small" ? "none" : "flex"}>{tab}</Text>
        </Flex>
      )
    case 'Emails': 
      return (
        <Flex alignItems="center" justify="center">
          <EmailIcon {...props}/>
          <Text ml={5} display={navSize == "small" ? "none" : "flex"}>{tab}</Text>
        </Flex>
       )
    case 'Dashboard':
      return (
        <Flex alignItems="center" justify="center">
          <UserIcon {...props}/>
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
const NavItem = ({ title, path, description, active, navSize, router }: NavItemProps) => {
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
          w={navSize == "large" ? "100%" : "35%"}
        >
          <MenuButton
            as={MenuItem}
            w={navSize == "large" ? "100%" : "35%"}
            p={3}
            borderRadius={8}
            backgroundColor="rgba(255, 217, 217, 0.8)"
            _hover={{ textDecor: 'none', backgroundColor: "rgba(255, 0, 0, 0.9)", color: "#fff", '& svg': { color: '#fff' } }}
            onClick={() => router.push(path)}
          >
            <SidebarContent tab={title} navSize={navSize} color={active ? "rgba(255, 0, 0, 0.9)" : "gray.500"} />
          </MenuButton>
        </Link>
       {/* <MenuList
          py={0}
          border="none"
          w={200}
          h={200}
          ml={5}
        >
          
          <MenuItem onClick={() => router.push("/typebots")}>
          <NavHoverBox title={title} description={description} />
          </MenuItem>
      </MenuList>*/}
    </Menu>
  </Flex>
  );
} 

const CustomSideBar = () => {
  const router = useRouter();
  const { user } = useUser();
  const [navSize, changeNavSize] = useState<string>("large");

  const company = user?.company ?? user?.name

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
        alignItems="center"
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
          alignItems="flex-start"
          as="nav"
        >
          <Tooltip hasArrow label="Dashboard">
            <NavItem router={router} path={"/home"} navSize={navSize} title="Dashboard" description="Dashboard - Pagina de entrada." />
          </Tooltip>
          <Tooltip hasArrow label="Home">
            <NavItem router={router} path={`/${company}/home`} navSize={navSize} title="Home" description="Pagina inicial da aplicação." />
          </Tooltip>
          <Tooltip hasArrow label="Chat">
            <NavItem router={router} path={`/${company}/${user?.id}/chat`} navSize={navSize} title="Chat" description="Conteudo de chat disponivel." />
          </Tooltip>
          <Tooltip hasArrow label="Builder">
            <NavItem router={router} path={"/typebots"} navSize={navSize} title="Builder" description="Construtor de Bot" />
          </Tooltip>
          <Tooltip hasArrow label="Channels">
            <NavItem router={router} path={"/channels"} navSize={navSize} title="Channels" description="Canais de comunicação no Workspace" />
          </Tooltip>
          <Tooltip hasArrow label="Emails">
            <NavItem router={router} path={"/emails"} navSize={navSize} title="Emails" description="Lista dos emails enviados" />
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