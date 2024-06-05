import React, { useRef } from 'react'
import { HStack, Flex, Spacer, Box, useBreakpointValue, IconButton, useDisclosure } from '@chakra-ui/react'
import { ChevronRightIcon, LaptopIcon } from '@/components/icons'
import { useUser } from '@/features/account/hooks/useUser'
import Link from 'next/link'
import { EmojiOrImageIcon } from '@/components/EmojiOrImageIcon'
import { useWorkspace } from '@/features/workspace/WorkspaceProvider'
import { WorkspaceDropdown } from '@/features/workspace/components/WorkspaceDropdown'
import CustomSideBar from '@/components/SideBar'
 
interface Props {
  btn: React.MutableRefObject
  onOpenSidebar: () => void
  showSidebarButton?: boolean
}

const smVariant = { navigation: 'drawer', navigationButton: true }
const mdVariant = { navigation: 'sidebar', navigationButton: false }

export const DashboardHeader = () => {
  const { isOpen: isOpenSidebar, onOpen: onOpenSidebar, onClose: onCloseSidebar } = useDisclosure();
  const btnRef = useRef();

  //const [isSidebarOpen, setSidebarOpen] = useState(false);
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });

  /*const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  }*/

  return (
    <>
      <CustomSideBar
        btn={btnRef}
        variant={variants?.navigation}
        isOpen={isOpenSidebar}
        onClose={onCloseSidebar}
      />
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <Box ml={!variants?.navigationButton && 200}>
        <DashboardHeaderContent
          btn={btnRef}
          showSidebarButton={variants?.navigationButton}
          onOpenSidebar={onOpenSidebar}
        />
      </Box>
    </>
  );
}
const DashboardHeaderContent = ({ btn, onOpenSidebar }: Props) => {
  const { user, logOut } = useUser();
  const { workspace, switchWorkspace, createWorkspace } = useWorkspace();

  const handleCreateNewWorkspace = () => {
    createWorkspace(user?.name ?? undefined);
  }

  return (
    <Flex minWidth="max-content" alignItems="center" w="full" borderBottomWidth="1px" justify="center">
      <Box flex="1">
        
        <IconButton
          ref={btn}
          icon={<ChevronRightIcon w={8} h={8} />}
          aria-label="Colapse"
          colorScheme="blackAlpha"
          variant="outline"
          onClick={onOpenSidebar}
        />
       
      </Box>
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
  );
}