import React, { useState } from 'react'
import { HStack, Flex, Spacer, Box, useBreakpointValue, IconButton } from '@chakra-ui/react'
import { ChevronRightIcon, LaptopIcon } from '@/components/icons'
import { useUser } from '@/features/account/hooks/useUser'
import Link from 'next/link'
import { EmojiOrImageIcon } from '@/components/EmojiOrImageIcon'
import { useWorkspace } from '@/features/workspace/WorkspaceProvider'
import { WorkspaceDropdown } from '@/features/workspace/components/WorkspaceDropdown'
import CustomSideBar from '@/components/SideBar'
 
interface Props {
  onShowSidebar: () => void
  showSidebarButton?: boolean
}

const smVariant = { navigation: 'drawer', navigationButton: true }
const mdVariant = { navigation: 'sidebar', navigationButton: false }

export const DashboardHeader = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant })

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)

  return (
    <>
      <CustomSideBar
        variant={variants?.navigation}
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
      />
      <Box ml={!variants?.navigationButton && 200}>
        <DashboardHeaderContent
          showSidebarButton={variants?.navigationButton}
          onShowSidebar={toggleSidebar}
        />
      </Box>
    </>
  );
}
const DashboardHeaderContent = ({ showSidebarButton = true, onShowSidebar }: Props) => {
  const { user, logOut } = useUser();
  const { workspace, switchWorkspace, createWorkspace } = useWorkspace();

  const handleCreateNewWorkspace = () => createWorkspace(user?.name ?? undefined);

  return (
    <Flex minWidth="max-content" alignItems="center" w="full" borderBottomWidth="1px" justify="center">
      <Box flex="1">
        {showSidebarButton && (
          <IconButton
            icon={<ChevronRightIcon w={8} h={8} />}
            colorScheme="blackAlpha"
            variant="outline"
            onClick={onShowSidebar}
          />
        )}
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