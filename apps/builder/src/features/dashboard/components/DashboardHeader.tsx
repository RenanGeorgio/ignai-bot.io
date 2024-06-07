import React from 'react'
import { HStack, Flex, Spacer } from '@chakra-ui/react'
import { IgnaiIcon } from '@/components/icons'
import { useUser } from '@/features/account/hooks/useUser'
import Link from 'next/link'
import { EmojiOrImageIcon } from '@/components/EmojiOrImageIcon'
import { useWorkspace } from '@/features/workspace/WorkspaceProvider'
import { WorkspaceDropdown } from '@/features/workspace/components/WorkspaceDropdown'

export const DashboardHeader = () => {
  const { user, logOut } = useUser();
  const { workspace, switchWorkspace, createWorkspace } = useWorkspace();

  const handleCreateNewWorkspace = () => {
    createWorkspace(user?.name ?? undefined);
  }

  return (
    <Flex minWidth="max-content" alignItems="center" w="full" borderBottomWidth="1px" justify="center">
      <Link href="/typebots" data-testid="typebot-logo">
        <EmojiOrImageIcon
          boxSize="60px"
          icon={workspace?.icon}
          defaultIcon={IgnaiIcon} 
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

/*
<Box flex="1">
        <IconButton
          ref={btn as React.RefObject<HTMLButtonElement>}
          icon={<ChevronRightIcon w={8} h={8} />}
          aria-label="Colapse"
          colorScheme="blackAlpha"
          variant="outline"
          onClick={onOpenSidebar}
        />
      </Box>*/