import { NextApiRequest, NextApiResponse } from 'next'
import { getAuthenticatedUser } from '@/features/auth/helpers/getAuthenticatedUser'
import { methodNotAllowed, badRequest, notAuthenticated } from '@typebot.io/lib/api'
import { env } from '@typebot.io/env'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getAuthenticatedUser(req, res);

  if (!user) {
    return notAuthenticated(res);
  }

  const email = req.query.email as string | undefined

  if (!email) {
    return badRequest(res);
  }

  if (req.method === 'GET') {
    if (env?.ADMIN_EMAIL?.includes(email)) {
      return res.status(200).send({ value: true });
    } else {
      return res.status(400).send({ value: false, message: "Bad request" });
    }
  }

  methodNotAllowed(res);
}

export default handler