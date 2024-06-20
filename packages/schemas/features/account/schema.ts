import { z } from '../../zod'

export const accountSchema = z.object({
  id: z.string(),
  userId: z.string().nullable(),
  type: z.string().nullable(), 
  provider: z.string().nullable(),
  providerAccountId: z.string().nullable(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
  oauth_token_secret: z.string().nullable(),
  oauth_token: z.string().nullable(),
  refresh_token_expires_in: z.number().nullable(),
})

export type Account = z.infer<typeof accountSchema>