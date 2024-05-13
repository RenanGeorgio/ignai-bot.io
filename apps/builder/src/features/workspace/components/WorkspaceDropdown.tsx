import { useEffect, useState } from 'react'
import { EmojiOrImageIcon } from '@/components/EmojiOrImageIcon'
import {
  HardDriveIcon,
  ChevronLeftIcon,
  PlusIcon,
  LogOutIcon,
  UserIcon,
  SettingsIcon
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
  const { isOpen, onOpen, onClose } = useDisclosure()

  const renderAccountModal = () => {
    return(
      <AccountSettingsModal
        isOpen={isOpen}
        onClose={onClose}
        user={user}
      />
    );
  }

  const renderWorkspaceModal = () => {
    return(
      <WorkspaceSettingsModal
        isOpen={isOpen}
        onClose={onClose}
        user={user}
        workspace={workspace}
      />
    );
  }

  const validAdmin = async (email: string) => {
    const data = await checkUser(email);

    const body = data.response;
    if (body) {
      const { value } = body;
      setAdmin(value);
    } else {
      setAdmin(false);
    }
  }

  useEffect(() => {
    if (user?.email) {
      validAdmin(user?.email);
    } else {
      setAdmin(false);
    }
  },[user?.email]);

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
                  defaultIcon={HardDriveIcon}
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
        <MenuItem onClick={renderAccountModal} icon={<UserIcon />}>
          {t('editor.header.settingsButton.label')}
        </MenuItem>
        <MenuItem onClick={renderWorkspaceModal} icon={<SettingsIcon />}>
          {t('workspace.settings.modal.menu.workspace.label')}
        </MenuItem>
        <MenuItem
          onClick={onLogoutClick}
          icon={<LogOutIcon />}
          color="orange.500"
        >
          {t('workspace.dropdown.logoutButton.label')}
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
