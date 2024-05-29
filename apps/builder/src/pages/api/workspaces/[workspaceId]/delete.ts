import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@typebot.io/lib/prisma'
import Stripe from 'stripe'
import { getAuthenticatedUser } from '@/features/auth/helpers/getAuthenticatedUser'
import { methodNotAllowed, notAuthenticated, notFound, forbidden, isNotEmpty } from '@typebot.io/lib/api'
import { env } from '@typebot.io/env'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getAuthenticatedUser(req, res);

  if (!user) {
    return notAuthenticated(res);
  }
  
  if (req.method === 'DELETE') {
    const workspaceId = req.query.workspaceId as string;

    const workspace = await prisma.workspace.findFirst({
      where: { id: workspaceId },
      include: { members: true },
    });

    if (!workspace) {
      return notFound(res);
    }

    const userRole = workspace.members.find((member) => member.userId === user.id)?.role;

    if (!workspace || (userRole !== 'ADMIN')) { // TO-DO: Mudar para OWNER
      return forbidden(res);
    }

    await prisma.workspace.deleteMany({
      where: { id: workspaceId },
    });

    if (isNotEmpty(workspace.stripeId) && env.STRIPE_SECRET_KEY) {
      const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
        apiVersion: '2022-11-15',
      })

      const subscriptions = await stripe.subscriptions.list({
        customer: workspace.stripeId,
      })

      for (const subscription of subscriptions.data) {
        await stripe.subscriptions.cancel(subscription.id)
      }
    }

    return res.status(200).json({ message: 'Workspace deleted' });
  }

  methodNotAllowed(res);
}

export default handler