import { ExecuteIntegrationResponse } from '../../../types'
import { isDefined } from '@typebot.io/lib'
import { ChatwootBlock, SessionState, ignaiChatbotRtBlock } from '@typebot.io/schemas'
import { extractVariablesFromText } from '@typebot.io/variables/extractVariablesFromText'
import { parseGuessedValueType } from '@typebot.io/variables/parseGuessedValueType'
import { parseVariables } from '@typebot.io/variables/parseVariables'

const parseSetUserCode = (
  user: NonNullable<ChatwootBlock['options']>['user'],
  resultId: string
) =>
  user?.email || user?.id
    ? `
window.$ignaichatbot.setUser(${user?.id ?? user.email ?? `"${resultId}"`}, {
  email: ${user?.email ? user.email : 'undefined'},
  name: ${user?.name ? user.name : 'undefined'},
  avatar_url: ${user?.avatarUrl ? user.avatarUrl : 'undefined'},
  phone_number: ${user?.phoneNumber ? user.phoneNumber : 'undefined'},
});`
    : ''

const parseIgnaiChatbotOpenCode = ({
  baseUrl='https://agent.ignaibot.com',
  user,
  resultId,
  typebotId,
}: ignaiChatbotRtBlock['options'] & { typebotId: string; resultId: string }) => {
  console.log(baseUrl, user, resultId, typebotId);
  
  return `
  (function (d, t) {
    // D = documento, t = script

    var iframe = document.createElement('iframe');
    iframe.src = "${baseUrl}?&typebot_id=${typebotId}&result_id=${resultId}";
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

const ignaichatbotCloseCode = `
if (window.$ignaichatbot) {
  window.$ignaichatbot.toggle("close");
  window.$ignaichatbot.toggleBubbleVisibility("hide");
}
`

export const executeIgnaiChatbotBlock = (
  state: SessionState,
  block: ignaiChatbotRtBlock
): ExecuteIntegrationResponse => {
  if (state.whatsApp) {
    return { outgoingEdgeId: block.outgoingEdgeId }
  }

  const { typebot, resultId } = state.typebotsQueue[0];

  const ignaichatbotCode =
    block.options?.task === 'Close widget'
      ? ignaichatbotCloseCode
      : isDefined(resultId)
      ? parseIgnaiChatbotOpenCode({
          ...block.options,
          typebotId: typebot.id,
          resultId,
        })
      : ''

  return {
    outgoingEdgeId: block.outgoingEdgeId,
    clientSideActions: [
      {
        type: 'ignai-chatbot',
        ignaichatbot: {
          scriptToExecute: {
            content: parseVariables(typebot.variables, { fieldToParse: 'id' })(
              ignaichatbotCode
            ),
            args: extractVariablesFromText(typebot.variables)(ignaichatbotCode).map(
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
      ignaichatbotCode === ''
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