import { NextApiRequest, NextApiResponse } from 'next'
import ky from 'ky'
import prisma from '@typebot.io/lib/prisma'
import { TRPCError } from '@trpc/server'
import { getAuthenticatedUser } from '@/features/auth/helpers/getAuthenticatedUser'
import { methodNotAllowed, badRequest, notAuthenticated, notFound } from '@typebot.io/lib/api'
import { isReadTypebotForbidden } from '@/features/typebot/helpers/isReadTypebotForbidden'
import { canWriteTypebots } from '@/helpers/databaseRules'
import { env } from '@typebot.io/env'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getAuthenticatedUser(req, res);

  if (!user) {
    return notAuthenticated(res);
  }

  if (req.method === 'DELETE') {
    const typebotId = req.query.typebotId as string | undefined

    if (!typebotId) {
      return badRequest(res);
    }

    const typebot = await prisma.typebot.findFirst({
      where: canWriteTypebots(typebotId, user)
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!typebot?.workspace || (await isReadTypebotForbidden(typebot, user))) {
      return notFound(res, 'Workspace not found')
    }

    if (!typebot) {
      return notFound(res, 'Typebot not found')
    }

    try {
      await ky.delete(
        `${env.CHATBOT_SERVER_URL}/domains?typebotId=${typebotId}`,
        {
          headers: { Authorization: `Bearer ${env.VERCEL_TOKEN}` }
        }
      );

      return res.status(200).send({ message: 'success' });
    } catch (err) {
      console.error(err);

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to delete bot register value',
      });
    }
  }

  methodNotAllowed(res);
}

export default handler