import { NextApiRequest, NextApiResponse } from 'next'
import ky from 'ky'
import prisma from '@typebot.io/lib/prisma'
import { TRPCError } from '@trpc/server'
import { getAuthenticatedUser } from '@/features/auth/helpers/getAuthenticatedUser'
import { methodNotAllowed, badRequest, notAuthenticated, notFound } from '@typebot.io/lib/api'
import { isReadTypebotForbidden } from '@/features/typebot/helpers/isReadTypebotForbidden'
import { env } from '@typebot.io/env'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getAuthenticatedUser(req, res);

  if (!user) {
    return notAuthenticated(res);
  }

  if (req.method === 'POST') {
    const typebotId = req.query.typebotId as string | undefined

    if (!typebotId) {
      return badRequest(res);
    }

    const typebot = await prisma.typebot.findFirst({
      where: {
        id: typebotId,
      }
    });

    if (!typebot) {
      return notFound(res, 'Typebot not found')
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!typebot?.workspace || (await isReadTypebotForbidden(typebot, user))) {
      return notFound(res, 'Workspace not found')
    }

    try {
      const data =  await ky.post(
        `${env.CHATBOT_SERVER_URL}/domains`,
        {
          headers: {
            authorization: `Bearer ${env.VERCEL_TOKEN}`, // TO-DO: TROCAR PELO METODO DE PERM CORRETO
            'Content-Type': 'application/json',
          },
          json: JSON.stringify(typebot)
        }
      ).json();

      return res.status(200).send({ data });
    } catch (err) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Could not reach server to update bot state value',
        cause: err
      });
    }
  }

  methodNotAllowed(res);
}

export default handler