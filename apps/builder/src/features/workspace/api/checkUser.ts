import { sendRequest } from '@typebot.io/lib';

export const checkUser = async (value: string) => {
  return sendRequest({
    url: `/api/users/is-admin?email=${value}`,
    method: 'GET',
  });
}