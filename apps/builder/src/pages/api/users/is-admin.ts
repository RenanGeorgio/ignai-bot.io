import { NextApiRequest, NextApiResponse } from 'next'
import { TRPCError } from '@trpc/server'
import { getAuthenticatedUser } from '@/features/auth/helpers/getAuthenticatedUser'
import { methodNotAllowed, badRequest, notAuthenticated } from '@typebot.io/lib/api'
import { env } from '@typebot.io/env'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getAuthenticatedUser(req, res);

  if (!user) {
    return notAuthenticated(res);
  }

  try {
    const email = req.query.email as string | undefined

    if (!email) {
      return badRequest(res);
    }

    if (req.method === 'GET') {
      if (env?.ADMIN_EMAIL?.includes(email)) {
        return { message: 'is admin', value: true };
      } 

      return { message: 'not admin', value: false };
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