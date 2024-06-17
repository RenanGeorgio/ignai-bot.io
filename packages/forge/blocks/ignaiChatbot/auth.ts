import { option, AuthDefinition } from '@typebot.io/forge'

export const auth = {
  type: 'encryptedCredentials',
  name: 'Ignai Chatbot token',
  schema: option.object({
    token: option.string.layout({
      label: 'Chatbot token',
      isRequired: true,
      inputType: 'password',
      // helperText: 'You can generate an API key [here](<INSERT_URL>).',
      withVariableButton: false,
      isDebounceDisabled: true,
    }),
  }),
} satisfies AuthDefinition
