import {
  Modal,
  ModalOverlay,
  ModalContent,
  Stack,
  Text,
  Button,
  Flex,
} from '@chakra-ui/react'
import {
  CreditCardIcon,
  HardDriveIcon,
  UsersIcon,
} from '@/components/icons'
import { EmojiOrImageIcon } from '@/components/EmojiOrImageIcon'
import { User, WorkspaceRole } from '@typebot.io/prisma'
import { useState } from 'react'
import { MembersList } from './MembersList'
import { WorkspaceSettingsForm } from './WorkspaceSettingsForm'
import { WorkspaceInApp, useWorkspace } from '../WorkspaceProvider'
import packageJson from '../../../../../../package.json'
import { BillingSettingsLayout } from '@/features/billing/components/BillingSettingsLayout'
import { useTranslate } from '@tolgee/react'
 
type Props = {
  isOpen: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: User | any
  workspace: WorkspaceInApp | undefined
  onClose: () => void
}

type SettingsTab =
  | 'workspace-settings'
  | 'members'
  | 'billing'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const WorkspaceSettingsModal = ({ isOpen, user, workspace, onClose }: Props) => {
  const { t } = useTranslate()
  const { currentRole } = useWorkspace()
  const [selectedTab, setSelectedTab] = useState<SettingsTab>('workspace-settings')

  const canEditWorkspace = currentRole === WorkspaceRole.ADMIN

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent minH="600px" flexDir="row">
        <Stack
          spacing={8}
          w="180px"
          py="6"
          borderRightWidth={1}
          justifyContent="space-between"
        >
          <Stack spacing={8}>
            <Stack>
              <Text pl="4" color="gray.500">
                {t('workspace.settings.modal.menu.workspace.label')}
              </Text>
              {canEditWorkspace && (
                <Button
                  variant={
                    selectedTab === 'workspace-settings' ? 'solid' : 'ghost'
                  }
                  onClick={() => setSelectedTab('workspace-settings')}
                  leftIcon={
                    <EmojiOrImageIcon
                      icon={workspace?.icon}
                      boxSize="15px"
                      defaultIcon={HardDriveIcon}
                    />
                  }
                  size="sm"
                  justifyContent="flex-start"
                  pl="4"
                >
                  {t('workspace.settings.modal.menu.settings.label')}
                </Button>
              )}
              {currentRole !== WorkspaceRole.GUEST && (
                <Button
                  variant={selectedTab === 'members' ? 'solid' : 'ghost'}
                  onClick={() => setSelectedTab('members')}
                  leftIcon={<UsersIcon />}
                  size="sm"
                  justifyContent="flex-start"
                  pl="4"
                >
                  {t('workspace.settings.modal.menu.members.label')}
                </Button>
              )}
              {canEditWorkspace && (
                <Button
                  variant={selectedTab === 'billing' ? 'solid' : 'ghost'}
                  onClick={() => setSelectedTab('billing')}
                  leftIcon={<CreditCardIcon />}
                  size="sm"
                  justifyContent="flex-start"
                  pl="4"
                  overflow="auto"
                >
                  {t('workspace.settings.modal.menu.billingAndUsage.label')}
                </Button>
              )}
            </Stack>
          </Stack>

          <Flex justify="center" pt="10">
            <Text color="gray.500" fontSize="xs">
              {t('workspace.settings.modal.menu.version.label', {
                version: packageJson.version,
              })}
            </Text>
          </Flex>
        </Stack>

        {isOpen && (
          <Flex flex="1" p="10">
            <SettingsContent tab={selectedTab} onClose={onClose} />
          </Flex>
        )}
      </ModalContent>
    </Modal>
  )
}

const SettingsContent = ({
  tab,
  onClose,
}: {
  tab: SettingsTab
  onClose: () => void
}) => {
  switch (tab) {
    case 'workspace-settings':
      return <WorkspaceSettingsForm onClose={onClose} />
    case 'members':
      return <MembersList />
    case 'billing':
      return <BillingSettingsLayout />
    default:
      return null
  }
}
