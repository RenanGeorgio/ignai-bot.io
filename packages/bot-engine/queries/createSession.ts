import prisma from '@typebot.io/lib/prisma'
import { Prisma } from '@typebot.io/prisma'
import { SessionState } from '@typebot.io/schemas'

type Props = {
  id?: string
  state: SessionState
  isReplying?: boolean
}

export const createSession = ({
  id,
  state,
  isReplying,
}: Props): Prisma.PrismaPromise<any> => {
  console.log(id)
  console.log(state)
  console.log(isReplying)
  return prisma.chatSession.create({
    data: {
      id,
      state,
      isReplying,
    },
  });
}
