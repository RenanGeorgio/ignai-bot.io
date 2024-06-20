import { getAuthenticatedUser, getAccountUser } from '@/features/auth/helpers/getAuthenticatedUser'
import { inferAsyncReturnType } from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { env } from '@typebot.io/env'

function parseJwt(token: string) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

export async function createContext(opts: trpcNext.CreateNextContextOptions) {
  const user = await getAuthenticatedUser(opts.req, opts.res)
  if (user && !env.NEXT_PUBLIC_E2E_TEST) {
    const account = await getAccountUser(user.id)
    const auth0 = parseJwt(account?.id_token ?? "")
    return {
      user: { ...user, full_name: auth0.full_name}
    }
  } else {
    return {
      user
    }
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
