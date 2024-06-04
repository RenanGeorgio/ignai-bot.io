import React from 'react'
import { HStack, Flex, Spacer } from '@chakra-ui/react'
import { LaptopIcon } from '@/components/icons'
import { useUser } from '@/features/account/hooks/useUser'
import Link from 'next/link'
import { EmojiOrImageIcon } from '@/components/EmojiOrImageIcon'
import { useWorkspace } from '@/features/workspace/WorkspaceProvider'
import { WorkspaceDropdown } from '@/features/workspace/components/WorkspaceDropdown'
import CustomSideBar from '@/components/SideBar'
 
export const DashboardHeader = () => {
  return (
    <CustomSideBar>
      <DashboardHeaderContent />
    </CustomSideBar>
  );
}
const DashboardHeaderContent = () => {
  const { user, logOut } = useUser();
  const { workspace, switchWorkspace, createWorkspace } = useWorkspace();

  const handleCreateNewWorkspace = () => createWorkspace(user?.name ?? undefined);

  return (
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
  );
}