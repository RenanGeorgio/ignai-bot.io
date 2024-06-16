import { env } from '@typebot.io/env';

export const isUserMasterAdmin = (userEmail: string) => {
  if ((env.ADMIN_EMAIL?.some((email) => email === userEmail)) || (env.ADMIN_EMAIL?.includes(userEmail))) {
    return true
  }

  return false
}