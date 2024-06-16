import { sendRequest } from '@typebot.io/lib';

export const checkUserQuery = (value: string) =>
  sendRequest({
    url: `/api/users/is-admin?email=${value}`,
    method: 'GET',
  }
);