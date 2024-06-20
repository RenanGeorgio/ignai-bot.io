import { NextApiRequest, NextApiResponse } from 'next';
import ky from 'ky';
import prisma from '@typebot.io/lib/prisma';
import { methodNotAllowed, notAuthenticated, notFound } from '@typebot.io/lib/api';
import { getAuthenticatedUser } from '@/features/auth/helpers/getAuthenticatedUser';
import { env } from '@typebot.io/env';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getAuthenticatedUser(req, res);

  if (!user) {
    return notAuthenticated(res);
  }
  
  if (req.method === 'DELETE') {
    const workspaceId = req.query.workspaceId as string;
    const clientId = req.query.clientId as string;

    const workspace = await prisma.workspace.findFirst({
      where: { id: workspaceId }
    });

    if (!workspace) {
      return notFound(res);
    }

    await ky.delete(
      `${env.CHATBOT_SERVER_URL}/clients/${clientId}`,
      {
        headers: { Authorization: `Bearer ${env.VERCEL_TOKEN}` }
      }
    );

    return res.status(200).json({ message: 'Client deleted' });
  }

  methodNotAllowed(res);
}

export default handler