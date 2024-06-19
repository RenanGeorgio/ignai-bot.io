import { sendRequest } from '@typebot.io/lib'

type Obj = {
  [key: string]: any
}

export const updateClientsQuery = (
  workspaceId: string,
  client: Obj
) =>
  sendRequest({
    method: 'PATCH',
    url: `/api/clients/${workspaceId}/${client?.clientId}`,
    body: client,
  })