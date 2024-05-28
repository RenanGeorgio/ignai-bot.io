import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@typebot.io/lib/prisma'
import { getAuthenticatedUser } from '@/features/auth/helpers/getAuthenticatedUser'
import {
  methodNotAllowed,
  badRequest,
  notAuthenticated,
  notFound,
} from '@typebot.io/lib/api'
import { isReadTypebotForbidden } from '@/features/typebot/helpers/isReadTypebotForbidden'
import { canWriteTypebots } from '@/helpers/databaseRules'
import ky from 'ky'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getAuthenticatedUser(req, res)

  if (!user) {
    return notAuthenticated(res)
  }

  if (req.method === 'DELETE') {
    const typebotId = req.query.typebotId as string | undefined

    if (!typebotId) {
      return badRequest(res)
    }

    // const typebot = await prisma.typebot.findFirst({
    //   where: canWriteTypebots(typebotId, user),
    // })

    const deleteTypebot = await ky.delete(
      process.env.IGNAI_CHATBOT_SERVER + `/typebot/${typebotId}`
    )

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // if (!typebot?.workspace || (await isReadTypebotForbidden(typebot, user))) {
    //   return notFound(res, 'Workspace not found')
    // }

    // if (!typebot) {
    //   return notFound(res, 'Typebot not found')
    // }

    if (deleteTypebot.status !== 200) {
      return res.status(500).send({ message: 'error' })
    }

    return res.send({ message: 'success' }) //TO-DO: Acertar esquema de registro
  }

  methodNotAllowed(res)
}

export default handler
