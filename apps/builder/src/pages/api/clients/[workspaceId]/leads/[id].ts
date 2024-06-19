import { NextApiRequest, NextApiResponse } from 'next';
import ky from 'ky';
import prisma from '@typebot.io/lib/prisma';
import { getAuthenticatedUser } from '@/features/auth/helpers/getAuthenticatedUser';
import { methodNotAllowed, notAuthenticated, notFound } from '@typebot.io/lib/api';
import { env } from '@typebot.io/env';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getAuthenticatedUser(req, res);

  if (!user) {
    return notAuthenticated(res);
  }

  const workspaceId = req.query.workspaceId as string;

  const workspace = await prisma.workspace.findFirst({
    where: { id: workspaceId }
  });

  if (!workspace) {
    return notFound(res);
  }

  if (req.method === 'PATCH') {
    const lead = req.body
    const value = await ky.post(
      `${env.CHATBOT_SERVER_URL}/leads`,
      {
        headers: {
          authorization: `Bearer ${env.VERCEL_TOKEN}`,
        },
        json: JSON.stringify(lead),
      }
    ).json();

    return res.status(200).send({ value?.body });
  }

  if (req.method === 'DELETE') {
    const id = req.query.id as string
    await ky.delete(
      `${env.CHATBOT_SERVER_URL}/leads/${id}`,
      {
        headers: { Authorization: `Bearer ${env.VERCEL_TOKEN}` }
      }
    );

    return res.status(200).json({ message: 'Client deleted' });
  }
  methodNotAllowed(res)
}

export default handler