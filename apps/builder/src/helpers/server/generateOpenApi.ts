import { generateOpenApiDocument } from '@lilyrose2798/trpc-openapi'
import { writeFileSync } from 'fs'
import { publicRouter } from './routers/publicRouter'

const openApiDocument = generateOpenApiDocument(publicRouter, {
  title: 'Builder API',
  version: '1.0.0',
  baseUrl: 'https://ignaibot.com/api',
  docsUrl: 'https://docs.ignaibot.com/api-reference',
})

writeFileSync(
  './openapi/builder.json',
  JSON.stringify(openApiDocument, null, 2)
)