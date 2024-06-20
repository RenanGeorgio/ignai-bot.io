import { NextApiRequest, NextApiResponse } from 'next';
import ky from 'ky';
import { TRPCError } from '@trpc/server';
import { getAuthenticatedUser } from '@/features/auth/helpers/getAuthenticatedUser';
import { methodNotAllowed, notAuthenticated } from '@typebot.io/lib/api';
import { env } from '@typebot.io/env';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getAuthenticatedUser(req, res);

  if (!user) {
    return notAuthenticated(res);
  }

  try {
    if (req.method === 'GET') {
      const result = await ky.get(
        `${env.CHATBOT_SERVER_URL}/user?userId=${user?.id}`,
        {
          headers: {
            authorization: `Bearer ${env.VERCEL_TOKEN}`, 
            'Content-Type': 'application/json',
          }
        }
      ).json();  

      return res.status(200).send(result.body);
    }
  } catch (err) {
    console.error(err);

    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Could reach server',
      cause: err
    });
  }

  methodNotAllowed(res);
}

export default handler