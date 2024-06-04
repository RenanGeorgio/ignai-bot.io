import React from 'react'
import { HStack, Flex, Stack } from '@chakra-ui/react'
import { LaptopIcon } from '@/components/icons'
import { useUser } from '@/features/account/hooks/useUser'
import Link from 'next/link'
import { EmojiOrImageIcon } from '@/components/EmojiOrImageIcon'
import { useWorkspace } from '@/features/workspace/WorkspaceProvider'
import { WorkspaceDropdown } from '@/features/workspace/components/WorkspaceDropdown'
 
export const DashboardHeader = () => {
  const { user, logOut } = useUser();
  const { workspace, switchWorkspace, createWorkspace } = useWorkspace();

  const handleCreateNewWorkspace = () => createWorkspace(user?.name ?? undefined);

  return (
    <Flex w="full" borderBottomWidth="1px" justify="center">
      <Flex
        justify="space-between"
        alignItems="center"
        align={'flex-start'}
        h="16"
        maxW="1000px"
        flex="1"
      >
        <Stack align={'flex-start'}>
          <Link href="/typebots" data-testid="typebot-logo">
            <EmojiOrImageIcon
              boxSize="30px"
              icon={workspace?.icon}
              defaultIcon={LaptopIcon} 
            />
          </Link>
        </Stack>
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
    </Flex>
  )
}