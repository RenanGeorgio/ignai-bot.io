import React from 'react';
import { Stack, FormControl, FormLabel, Button, useDisclosure, Text, Input, InputGroup, InputRightElement, FormHelperText } from '@chakra-ui/react';
import { ConfirmModal } from '@/components/ConfirmModal';
import { useWorkspace } from '../WorkspaceProvider';
import { TextInput } from '@/components/inputs';
import { useTranslate } from '@tolgee/react';
import { CopyButton } from '@/components/CopyButton';

type DeleteProps = {
  workspaceName: string
  onConfirm: () => Promise<void>
}

type Props = {
  onClose: () => void
}

export const WorkspaceSettingsForm = ({ onClose }: Props) => {
  const { t } = useTranslate();
  const { workspace, workspaces, updateWorkspace, deleteCurrentWorkspace } = useWorkspace();

  const handleNameChange = (name: string) => {
    if (!workspace?.id) {
      return
    }

    updateWorkspace({ name });
  }

  const handleDeleteClick = async () => {
    await deleteCurrentWorkspace();
    onClose();
  }

  return (
    <Stack spacing="6" w="full">
      {workspace && (
        <>
          <TextInput
            label={t('workspace.settings.name.label')}
            withVariableButton={false}
            defaultValue={workspace?.name}
            onChange={handleNameChange}
          />
          <FormControl>
            <FormLabel>ID:</FormLabel>
            <InputGroup>
              <Input
                type={'text'}
                defaultValue={workspace.id}
                pr="16"
                readOnly
              />
              <InputRightElement width="72px">
                <CopyButton textToCopy={workspace.id} size="xs" />
              </InputRightElement>
            </InputGroup>
            <FormHelperText>
              Usado para interagir com as API&apos;s.
            </FormHelperText>
          </FormControl>
        </>
      )}
      {workspace && workspaces && workspaces.length > 1 && (
        <DeleteWorkspaceButton
          onConfirm={handleDeleteClick}
          workspaceName={workspace?.name}
        />
      )}
    </Stack>
  );
}

const DeleteWorkspaceButton = ({ workspaceName, onConfirm }: DeleteProps) => {
  const { t } = useTranslate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button colorScheme="red" variant="outline" onClick={onOpen}>
        {t('workspace.settings.deleteButton.label')}
      </Button>
      <ConfirmModal
        isOpen={isOpen}
        onConfirm={onConfirm}
        onClose={onClose}
        message={
          <Text>
            {t('workspace.settings.deleteButton.confirmMessage', {
              workspaceName,
            })}
          </Text>
        }
        confirmButtonLabel="Delete"
      />
    </>
  );
}