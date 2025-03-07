import { createAction, option } from '@typebot.io/forge'
import { isDefined, isEmpty } from '@typebot.io/lib'
import ky, { HTTPError } from 'ky'
import { apiBaseUrl } from '../constants'
import { auth } from '../auth'
import { ChatNodeResponse } from '../types'

export const sendMessage = createAction({
  auth,
  name: 'Send Message',
  turnableInto: undefined,
  options: option.object({
    // botId: option.string.layout({
    //   label: 'Bot ID',
    //   placeholder: '68c052c5c3680f63',
    //   moreInfoTooltip:
    //     'The bot_id you want to ask question to. You can find it at the end of your ChatBot URl in your dashboard',
    // }),
    // threadId: option.string.layout({
    //   label: 'Thread ID',
    //   moreInfoTooltip:
    //     'Used to remember the conversation with the user. If empty, a new thread is created.',
    // }),
    message: option.string.layout({
      label: 'Message',
      placeholder: 'Olá, como posso ajudar?',
      inputType: 'textarea',
    }),
    responseMapping: option.saveResponseArray(['Message', 'Thread ID']).layout({
      accordion: 'Salvar resposta',
    }),
  }),
  getSetVariableIds: ({ responseMapping }) =>
    responseMapping?.map((r) => r.variableId).filter(isDefined) ?? [],
  run: {
    server: async ({
      credentials: { token },
      options: { message, responseMapping },
      variables,
      logs,
    }) => {
      try {
        const res: ChatNodeResponse = await ky
          .post(apiBaseUrl + '/api/v1/chat/send-message', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            json: {
              message,
              // chat_session_id: isEmpty(threadId) ? undefined : threadId,
            },
          })
          .json()
        responseMapping?.forEach((mapping) => {
          console.log(mapping)
          if (!mapping.variableId) return

          const item = mapping.item ?? 'Message'
          if (item === 'Message') variables.set(mapping.variableId, res.message)

          // if (item === 'Thread ID')
          //   variables.set(mapping.variableId, res.chat_session_id)
        })
      } catch (error) {
        if (error instanceof HTTPError)
          return logs.add({
            status: 'error',
            description: error.message,
            details: await error.response.text(),
          })
        console.error(error)
      }
    },
  },
})
