import { sendRequest } from '@typebot.io/lib'

type Obj = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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