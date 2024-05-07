import {
  Modal,
  ModalOverlay,
  ModalContent,
  Stack,
  Text,
  Button,
  Avatar,
  Flex,
} from '@chakra-ui/react'
import { SettingsIcon } from '@/components/icons'
import { useState } from 'react'
import packageJson from '../../../../../../package.json'
import { UserPreferencesForm } from '@/features/account/components/UserPreferencesForm'
import { MyAccountForm } from '@/features/account/components/MyAccountForm'
import { useTranslate } from '@tolgee/react'
 
type Props = {
  isOpen: boolean
  user: any
  onClose: () => void
}

type SettingsTab =
  | 'my-account'
  | 'user-settings'

export const AccountSettingsModal = ({
  isOpen,
  user,
  onClose,
}: Props) => {
  const { t } = useTranslate()
  const [selectedTab, setSelectedTab] = useState<SettingsTab>('my-account')

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
                {user.email}
              </Text>
              <Button
                variant={selectedTab === 'my-account' ? 'solid' : 'ghost'}
                onClick={() => setSelectedTab('my-account')}
                leftIcon={
                  <Avatar
                    name={user.name ?? undefined}
                    src={user.image ?? undefined}
                    boxSize="15px"
                  />
                }
                size="sm"
                justifyContent="flex-start"
                pl="4"
              >
                {t('workspace.settings.modal.menu.myAccount.label')}
              </Button>
              <Button
                variant={selectedTab === 'user-settings' ? 'solid' : 'ghost'}
                onClick={() => setSelectedTab('user-settings')}
                leftIcon={<SettingsIcon />}
                size="sm"
                justifyContent="flex-start"
                pl="4"
              >
                {t('workspace.settings.modal.menu.preferences.label')}
              </Button>
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SettingsContent = ({ tab, onClose }: {
  tab: SettingsTab
  onClose: () => void
}) => {
  switch (tab) {
    case 'my-account':
      return <MyAccountForm />
    case 'user-settings':
      return <UserPreferencesForm />
    default:
      return null
  }
}
