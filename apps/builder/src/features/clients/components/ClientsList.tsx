import React from 'react';
import { HStack, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react';
import { ClientsItem } from './ClientsItem';
import { useWorkspace } from '@/features/workspace/WorkspaceProvider';
import { deleteLeadsQuery } from '../queries/deleteLeadsQuery';
import { deleteClientsQuery } from '../queries/deleteClientsQuery';
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
  const { members, invitations, isLoading, mutate } = useMembers({ workspaceId: workspace?.id });

  const { clients } = useClients()

  const handleDeleteMemberClick = (memberId: string) => async () => {
    if (!workspace) {
      return
    }

    await deleteClientsQuery(workspace.id, memberId);

    mutate({
      members: members.filter((m) => m.userId !== memberId),
      invitations,
    });
  }

  const handleDeleteInvitationClick = (id: string) => async () => {
    if (!workspace) {
      return
    }

    await deleteLeadsQuery({ workspaceId: workspace.id, id });
    
    mutate({
      invitations: invitations.filter((i) => i.id !== id),
      members,
    });
  }

  return (
    <Stack w="full" spacing={3}>
      {members.map((member) => (
        <ClientsItem
          key={member.userId}
          email={member.email ?? ''}
          image={member.image ?? undefined}
          name={member.name ?? undefined}
          onDeleteClick={handleDeleteMemberClick(member.userId)}
          onClick={() => onClientClick(member)}
          isSelected={selectedClient?._id === member.userId}
        />
      ))}
      {invitations.map((invitation) => (
        <ClientsItem
          key={invitation.email}
          email={invitation.email ?? ''}
          onDeleteClick={handleDeleteInvitationClick(invitation.id)}
          isGuest
          onClick={() => onClientClick(invitation)}
          isSelected={selectedClient?.email === invitation.email}
        />
      ))}
      {clients?.map((client) => (
        <ClientsItem
          key={client._id}
          email={client.username ?? ''}
          name={client.name ?? undefined}
          onDeleteClick={() => {}}
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