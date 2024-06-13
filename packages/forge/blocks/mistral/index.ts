import { createBlock } from '@typebot.io/forge'
import { MistralLogo } from './logo'
import { auth } from './auth'
import { createChatCompletion } from './actions/createChatCompletion'

export const mistralBlock = createBlock({
  id: 'mistral',
  name: 'Mistral',
  tags: ['ai', 'chat', 'completion'],
  LightLogo: MistralLogo,
  auth,
  actions: [createChatCompletion],
  docsUrl: 'https://docs.ignaibot.com/forge/blocks/mistral',
})
