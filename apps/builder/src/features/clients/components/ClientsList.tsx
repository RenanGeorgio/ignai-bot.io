import React from 'react';
import { HStack, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react';
import { ClientsItem } from './ClientsItem';
import { useWorkspace } from '@/features/workspace/WorkspaceProvider';
import { deleteLeadsQuery } from '../queries/deleteLeadsQuery';
import { deleteClientsQuery } from '../queries/deleteClientsQuery';
import { useMembers } from '@/features/workspace/hooks/useMembers';

export const ClientsList = () => {
  const { workspace } = useWorkspace();
  const { members, invitations, isLoading, mutate } = useMembers({ workspaceId: workspace?.id });

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
        />
      ))}
      {invitations.map((invitation) => (
        <ClientsItem
          key={invitation.email}
          email={invitation.email ?? ''}
          onDeleteClick={handleDeleteInvitationClick(invitation.id)}
          isGuest
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