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
import { ChevronRightIcon } from './icons'

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
  customIcon: (props: IconProps) => JSX.Element
  title: string 
  description?: string 
  active?:  boolean
  navSize: string
}

interface HoverProps {
  title: string 
  customIcon: undefined | ((props: IconProps) => JSX.Element)
  description: string | undefined
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NavHoverBox = ({ title, customIcon, description }: HoverProps) => {
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
        <customIcon />
        <Heading size="md" fontWeight="normal">{title}</Heading>
        <Text>{description}</Text>
      </Flex>
    </>
  );
}

const NavItem = ({ customIcon, title, description, active, navSize }: NavItemProps) => {
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
              <customIcon color={active ? "#82AAAD" : "gray.500"} />
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
          <NavHoverBox title={title} customIcon={customIcon} description={description} />
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
          icon={<ChevronRightIcon />}
          onClick={() => {
            if (navSize == "small") {
              changeNavSize("large")
            } else {
              changeNavSize("small")
            }
          }}
        />
        <NavItem navSize={navSize} customIcon={<ChevronRightIcon />} title="Dashboard" description="This is the description for the dashboard." />
        <NavItem navSize={navSize} customIcon={<ChevronRightIcon />} title="Calendar" active />
        <NavItem navSize={navSize} customIcon={<ChevronRightIcon />} title="Clients" />
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