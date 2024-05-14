import { stringify } from 'qs'
import { sendRequest } from '@typebot.io/lib'

export const checkUser = async (value: string) => {
  const queryParams = stringify({ value });
  return sendRequest({
    url: `/api/users/is-admin?email=${queryParams}`,
    method: 'GET',
  });
}