import { sendRequest } from '@typebot.io/lib'

export const deleteLeadsQuery = (lead: {
  workspaceId: string
  id: string
}) =>
  sendRequest({
    url: `/api/clients/${lead.workspaceId}/leads/${lead.id}`,
    method: 'DELETE',
  }
);