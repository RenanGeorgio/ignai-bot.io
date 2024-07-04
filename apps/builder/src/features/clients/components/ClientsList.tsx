import React from 'react';
import { HStack, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react';
import { ClientsItem } from './ClientsItem';
import { useWorkspace } from '@/features/workspace/WorkspaceProvider';
import { deleteLeadsQuery } from '../queries/deleteLeadsQuery';
import { useMembers } from '@/features/workspace/hooks/useMembers';
import { useClients } from '../hooks/useClients';
import { Client } from '../types';

/*
interface Client {
  _id: string
  username: string
  name?:string
}
*/

interface ClientsListProps {
  onClientClick: (client: Client) => void
  selectedClient: Client | null
}

export const ClientsList: React.FC<ClientsListProps> = ({ onClientClick, selectedClient }) => {
  const { workspace } = useWorkspace();
  const { isLoading } = useMembers({ workspaceId: workspace?.id });
  const { clients } = useClients();

  const handleDeleteInvitationClick = (id: string) => async () => {
    if (!workspace) {
      return
    }

    await deleteLeadsQuery({ workspaceId: workspace.id, id });
  }

  return (
    <Stack w="full" spacing={3}>
      {clients?.map((client) => (
        <ClientsItem
          key={client._id}
          email={client.username ?? ''}
          name={client.name ?? undefined}
          onDeleteClick={handleDeleteInvitationClick(client._id)}
          onClick={() => onClientClick(client)}
          isSelected={selectedClient?._id === client._id}
        />
      ))}
      {isLoading && (
        <HStack py="4">
          <SkeletonCircle boxSize="32px" />
          <SkeletonText width="200px" noOfLines={2} />
        </HStack>
      )}
    </Stack>
  );
}