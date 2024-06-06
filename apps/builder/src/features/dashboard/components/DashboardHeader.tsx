import React, { useRef } from 'react'
import { HStack, Flex, Spacer, Box, useBreakpointValue, IconButton, useDisclosure, VStack } from '@chakra-ui/react'
import { ChevronRightIcon, LaptopIcon } from '@/components/icons'
import { useUser } from '@/features/account/hooks/useUser'
import Link from 'next/link'
import { EmojiOrImageIcon } from '@/components/EmojiOrImageIcon'
import { useWorkspace } from '@/features/workspace/WorkspaceProvider'
import { WorkspaceDropdown } from '@/features/workspace/components/WorkspaceDropdown'
import CustomSideBar from '@/components/SideBar'
 
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
  onOpenSidebar: () => void
  showSidebarButton?: boolean
}

const smVariant = { navigation: 'drawer', navigationButton: true }
const mdVariant = { navigation: 'sidebar', navigationButton: false }

export const DashboardHeader = () => {
  const { isOpen: isOpenSidebar, onOpen: onOpenSidebar, onClose: onCloseSidebar } = useDisclosure();
  const btnRef = useRef<CustomElement>(null);

  //const [isSidebarOpen, setSidebarOpen] = useState(false);
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });

  /*const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  }*/

  return (
    <VStack>
      <DashboardHeaderContent
        btn={btnRef}
        showSidebarButton={variants?.navigationButton}
        onOpenSidebar={onOpenSidebar}
      />
      
      <Flex w="100%">
        <CustomSideBar
          btn={btnRef}
          variant={variants?.navigation}
          isOpen={isOpenSidebar}
          onClose={onCloseSidebar}
        />
        <Flex
          pos="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
        </Flex>
      </Flex>
    </VStack>
  );
}
const DashboardHeaderContent = ({ btn, onOpenSidebar }: Props) => {
  const { user, logOut } = useUser();
  const { workspace, switchWorkspace, createWorkspace } = useWorkspace();

  const handleCreateNewWorkspace = () => {
    createWorkspace(user?.name ?? undefined);
  }

  return (
    <VStack align='stretch'>
      <Flex minWidth="max-content" alignItems="center" w="full" borderBottomWidth="1px" justify="center">
        <Link href="/typebots" data-testid="typebot-logo">
          <EmojiOrImageIcon
            boxSize="30px"
            icon={workspace?.icon}
            defaultIcon={LaptopIcon} 
          />
        </Link>
        <Spacer />
        <HStack>
          <WorkspaceDropdown
            currentWorkspace={workspace} 
            onLogoutClick={logOut}
            onCreateNewWorkspaceClick={handleCreateNewWorkspace}
            onWorkspaceSelected={switchWorkspace}
            user={user}
          />
        </HStack>
      </Flex>
      <Box flex="1">
        <IconButton
          ref={btn as React.RefObject<HTMLButtonElement>}
          icon={<ChevronRightIcon w={8} h={8} />}
          aria-label="Colapse"
          colorScheme="blackAlpha"
          variant="outline"
          onClick={onOpenSidebar}
        />
      </Box>
    </VStack>
  );
}