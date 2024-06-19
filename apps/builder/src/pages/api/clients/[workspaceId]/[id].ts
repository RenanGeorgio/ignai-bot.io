import { NextApiRequest, NextApiResponse } from 'next'
import ky from 'ky'
import prisma from '@typebot.io/lib/prisma'
import { getAuthenticatedUser } from '@/features/auth/helpers/getAuthenticatedUser'
import { methodNotAllowed, notAuthenticated, notFound } from '@typebot.io/lib/api'
import { env } from '@typebot.io/env'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getAuthenticatedUser(req, res);

  if (!user) {
    return notAuthenticated(res);
  }

  if (req.method === 'PATCH') {
    const workspaceId = req.query.workspaceId as string
    const clientId = req.query.id as string
    const updates = req.body

    const workspace = await prisma.workspace.findFirst({
      where: { id: workspaceId }
    });

    if (!workspace) {
      return notFound(res);
    }

    const value = await ky.post(
      `${env.CHATBOT_SERVER_URL}/clients/${clientId}`,
      {
        headers: {
          authorization: `Bearer ${env.VERCEL_TOKEN}`,
        },
        json: JSON.stringify(updates),
      }
    ).json();

    return res.status(200).send(value?.body);
  }
  
  methodNotAllowed(res)
}

export default handler