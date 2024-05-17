import { sendRequest } from '@typebot.io/lib'
import { User } from '@typebot.io/schemas'

export const registerCompanyBots = (typebotId: string, { user }: { user:  Partial<User> }) => {
  sendRequest({
    url: '/api/typebots/register',
    method: 'POST',
    body: { typebotId, user }
  });
}

export const unregisterCompanyBots = (typebotId: string) => {
  sendRequest({
    url: `/api/typebots/register?typebotId=${typebotId}`,
    method: 'DELETE'
  });
}