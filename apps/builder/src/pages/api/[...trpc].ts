import { NextApiRequest, NextApiResponse } from 'next'
import * as Sentry from '@sentry/nextjs'
import cors from 'nextjs-cors'
import { createContext } from '@/helpers/server/context'
import { createOpenApiNextHandler } from '@lilyrose2798/trpc-openapi'
import { publicRouter } from '@/helpers/server/routers/publicRouter'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res, {
    origin: ['https://docs.typebot.io', 'http://localhost:3000', 'https://ignaibot.com', 'https://chatbot.ignai.com.br', 'https://supplyfy-chatbot.azurewebsites.net'],
  })

  return createOpenApiNextHandler({
    router: publicRouter,
    createContext,
    onError({ error }) {
      if (error.code === 'INTERNAL_SERVER_ERROR') {
        Sentry.captureException(error)
        console.error('Something went wrong', error)
      }
    },
  })(req, res)
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
}

export default handler
