import { sendRequest } from '@typebot.io/lib'

export const registerCompanyBots = (typebotId: string) => {
  sendRequest({
    url: '/api/typebots/register',
    method: 'POST',
    body: { typebotId }
  });
}

export const unregisterCompanyBots = (typebotId: string) => {
  sendRequest({
    url: `/api/typebots/register?typebotId=${typebotId}`,
    method: 'DELETE'
  });
}