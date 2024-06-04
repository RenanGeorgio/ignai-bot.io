import React, { useEffect, useState } from 'react'
import { EmojiOrImageIcon } from '@/components/EmojiOrImageIcon'
import {
  ChevronLeftIcon,
  PlusIcon,
  LogOutIcon,
  UserIcon,
  SettingsIcon,
  LaptopIcon
} from '@/components/icons'
import { PlanTag } from '@/features/billing/components/PlanTag'
import { useUser } from '@/features/account/hooks/useUser'
import { useWorkspace } from '@/features/workspace/WorkspaceProvider'
import { trpc } from '@/lib/trpc'
import { useTranslate } from '@tolgee/react'
import {
  Menu,
  MenuButton,
  Button,
  HStack,
  MenuList,
  MenuItem,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { WorkspaceInApp } from '../WorkspaceProvider'
import { AccountSettingsModal } from './AccountSettingsModal'
import { WorkspaceSettingsModal } from './WorkspaceSettingsModal'
import { checkUser } from '../api/checkUser'

type Props = {
  currentWorkspace?: WorkspaceInApp
  onWorkspaceSelected: (workspaceId: string) => void
  onCreateNewWorkspaceClick: () => void
  onLogoutClick: () => void
}

export const WorkspaceDropdown = ({
  currentWorkspace,
  onWorkspaceSelected,
  onLogoutClick,
  onCreateNewWorkspaceClick,
}: Props) => {
  const { t } = useTranslate()
  const { user } = useUser()
  const { workspace } = useWorkspace()
  const { data } = trpc.workspace.listWorkspaces.useQuery()

  const [isAdmin, setAdmin] = useState<boolean>(false);
 
  const workspaces = data?.workspaces ?? []

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isOpen: isOpenAccount, onOpen: onOpenAccount, onClose: onCloseAccount } = useDisclosure();
  const { isOpen: isOpenWorkspace, onOpen: onOpenWorkspace, onClose: onCloseWorkspace } = useDisclosure();

  const validAdmin = async (email: string) => {
    const data = await checkUser(email);

    const body = data?.response?.body;
    if (body) {
      console.log(body);
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }

  const handleWorkspaceClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenWorkspace();
  }

  const handleAccountClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenAccount();
  }

  useEffect(() => {
    if (user?.email) {
      validAdmin(user?.email);
    } else {
      setAdmin(false); 
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <Menu placement="bottom-end">
      <MenuButton as={Button} variant="outline" px="2">
        <HStack>
          {currentWorkspace && (
            <>
              <Text noOfLines={1} maxW="200px">
                {currentWorkspace.name}
              </Text>
              <PlanTag plan={currentWorkspace.plan} />
            </>
          )}
          <ChevronLeftIcon transform="rotate(-90deg)" />
        </HStack>
      </MenuButton>
      <MenuList>
        {workspaces
          ?.filter((workspace) => workspace.id !== currentWorkspace?.id)
          .map((workspace) => (
            <MenuItem
              key={workspace.id}
              onClick={() => onWorkspaceSelected(workspace.id)}
            >
              <HStack>
                <EmojiOrImageIcon
                  icon={workspace.icon}
                  boxSize="16px"
                  defaultIcon={LaptopIcon}
                />
                <Text>{workspace.name}</Text>
                <PlanTag plan={workspace.plan} />
              </HStack>
            </MenuItem>
          ))}
        {user?.email && isAdmin && (
          <MenuItem onClick={onCreateNewWorkspaceClick} icon={<PlusIcon />}>
            {t('workspace.dropdown.newButton.label')}
          </MenuItem>
        )}
        <MenuItem icon={<UserIcon />} onClick={handleAccountClick}>
          {t('editor.header.settingsButton.label')}
        </MenuItem>
        {!workspace.isPastDue && (
          <MenuItem icon={<SettingsIcon />} onClick={handleWorkspaceClick}>
            {t('workspace.settings.modal.menu.workspace.label')}
          </MenuItem>
        )}
        <MenuItem
          onClick={onLogoutClick}
          icon={<LogOutIcon />}
          color="orange.500"
        >
          {t('workspace.dropdown.logoutButton.label')}
        </MenuItem>
      </MenuList>
      {user && workspace && !workspace.isPastDue && (
        <WorkspaceSettingsModal
          isOpen={isOpenWorkspace}
          onClose={onCloseWorkspace}
          user={user}
          workspace={workspace}
        />
      )}
      {user && (
        <AccountSettingsModal
          isOpen={isOpenAccount}
          onClose={onCloseAccount}
          user={user}
        />
      )}
    </Menu>
  );
}