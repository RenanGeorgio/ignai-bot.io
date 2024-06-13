import { generateOpenApiDocument } from '@lilyrose2798/trpc-openapi'
import { writeFileSync } from 'fs'
import { appRouter } from './appRouter'

const openApiDocument = generateOpenApiDocument(appRouter, {
  title: 'Chat API',
  version: '3.0.0',
  baseUrl: 'https://ignaibot.com/api',
  docsUrl: 'https://docs.ignaibot.com/api-reference',
})

writeFileSync('./openapi/viewer.json', JSON.stringify(openApiDocument, null, 2))