import { ExecuteIntegrationResponse } from '../../../types'
//import { env } from '@typebot.io/env'
import { isDefined } from '@typebot.io/lib'
import {
  ChatwootBlock,
  SessionState,
  ignaiChatbotRtBlock,
} from '@typebot.io/schemas'
import { extractVariablesFromText } from '@typebot.io/variables/extractVariablesFromText'
import { parseGuessedValueType } from '@typebot.io/variables/parseGuessedValueType'
import { parseVariables } from '@typebot.io/variables/parseVariables'
//import { defaultChatwootOptions } from '@typebot.io/schemas/features/blocks/integrations/chatwoot/constants'

const parseSetUserCode = (
  user: NonNullable<ChatwootBlock['options']>['user'],
  resultId: string
) =>
  user?.email || user?.id
    ? `
window.$chatwoot.setUser(${user?.id ?? user.email ?? `"${resultId}"`}, {
  email: ${user?.email ? user.email : 'undefined'},
  name: ${user?.name ? user.name : 'undefined'},
  avatar_url: ${user?.avatarUrl ? user.avatarUrl : 'undefined'},
  phone_number: ${user?.phoneNumber ? user.phoneNumber : 'undefined'},
});`
    : ''

const parseChatwootOpenCode = ({
  baseUrl,
  websiteToken,
  user,
  resultId,
  typebotId,
}: ignaiChatbotRtBlock['options'] & { typebotId: string; resultId: string }) => {
  console.log(baseUrl, websiteToken, user, resultId, typebotId)
  return `
  (function (d, t) {
    // D = documento, t = script

    var iframe = document.createElement('iframe');
    iframe.src = "http://localhost:5000?website_token=${websiteToken}&typebot_id=${typebotId}&result_id=${resultId}";
    iframe.style.position = "fixed";
    iframe.style.bottom = "10px";
    iframe.style.right = "10px";
    iframe.style.zIndex = "9999";
    iframe.style.width = "400px";
    iframe.style.height = "400px";
    iframe.frameBorder = 0;
    setTimeout(function() {
      document.body.appendChild(iframe);
    }, 100);
  })(document, "script");`
}

const chatwootCloseCode = `
if (window.$chatwoot) {
  window.$chatwoot.toggle("close");
  window.$chatwoot.toggleBubbleVisibility("hide");
}
`

export const executeIgnaiChatbotBlock = (
  state: SessionState,
  block: ignaiChatbotRtBlock
): ExecuteIntegrationResponse => {
  if (state.whatsApp) return { outgoingEdgeId: block.outgoingEdgeId }
  const { typebot, resultId } = state.typebotsQueue[0]
  const chatwootCode =
    block.options?.task === 'Close widget'
      ? chatwootCloseCode
      : isDefined(resultId)
      ? parseChatwootOpenCode({
          ...block.options,
          typebotId: typebot.id,
          resultId,
        })
      : ''

  return {
    outgoingEdgeId: block.outgoingEdgeId,
    clientSideActions: [
      {
        type: 'chatwoot',
        chatwoot: {
          scriptToExecute: {
            content: parseVariables(typebot.variables, { fieldToParse: 'id' })(
              chatwootCode
            ),
            args: extractVariablesFromText(typebot.variables)(chatwootCode).map(
              (variable) => ({
                id: variable.id,
                value: parseGuessedValueType(variable.value),
              })
            ),
          },
        },
      },
    ],
    logs:
      chatwootCode === ''
        ? [
            {
              status: 'info',
              description: 'Bloco de atendimento humano não é suportado no modo preview',
              details: null,
            },
          ]
        : undefined,
  }
}