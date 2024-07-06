import { sendRequest } from '@typebot.io/lib'

export const deleteClientsQuery = (workspaceId: string, clientId: string) =>
  sendRequest({
    method: 'DELETE',
    url: `/api/clients/${workspaceId}/delete?clientId=${clientId}`,
  })