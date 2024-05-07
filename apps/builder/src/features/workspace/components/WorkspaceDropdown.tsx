import { EmojiOrImageIcon } from '@/components/EmojiOrImageIcon'
import {
  HardDriveIcon,
  ChevronLeftIcon,
  PlusIcon,
  LogOutIcon,
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
import { env } from '@typebot.io/env'

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
 
  const workspaces = data?.workspaces ?? []

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
        {env.ADMIN_EMAIL?.includes(user.email) && (
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
