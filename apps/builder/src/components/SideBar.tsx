import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Flex,
  Text,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
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

interface HoverProps {
  title: string 
  description: string | undefined
}

const SidebarContent = ({ tab, ...props }: { tab: string } & IconProps) => {
  switch (tab) {
    case 'Home':
      return (
        <Tooltip hasArrow label="Home">
          <FolderIcon {...props}/>
        </Tooltip>
      )
    case 'Chat':
      return (
        <></>
      )
    case 'Builder':
      return (
        <Tooltip hasArrow label="Builder">
          <ToolIcon {...props}/>
        </Tooltip>
      )
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

const NavItem = ({ title, description, active, navSize, router }: NavItemProps) => {
  return (
    <Flex
      mt={4} 
      flexDir="column"
      w="100%"
      alignItems="center" 
    >
      <Menu placement="right">
        <Link
          backgroundColor={active ? "rgba(255, 0, 0, 0.9)" : undefined}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: 'none', backgroundColor: "rgba(255, 0, 0, 0.9)", color: "#fff", '& svg': { color: '#fff' } }}
          w="100%"
        >
          <MenuButton w="100%">
            <Flex alignItems="center" justify="center">
              <SidebarContent tab={title} color="rgba(255, 0, 0, 0.9)" />
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
          <MenuItem onClick={() => router.push("/typebots")}>
            <NavHoverBox title={title} description={description} />
          </MenuItem>
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
      w={navSize == "small" ? "75px" : "150px"} 
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
          <NavItem router={router} navSize={navSize} title="Home" description="Pagina inicial da aplicação." />
          <NavItem router={router} navSize={navSize} title="Chat" description="Conteudo de chat disponivel." />
          <NavItem router={router} navSize={navSize} title="Builder" description="Construtor de Bot" />
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