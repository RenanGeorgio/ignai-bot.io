import { DropdownList } from '@/components/DropdownList'
import { TextInput } from '@/components/inputs'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Stack,
} from '@chakra-ui/react'
import {
  defaultIgnaiChatbotRtOptions,
  ignaiChatbotRtTasks,
} from '@typebot.io/schemas/features/blocks/integrations/ignaiChatbotRt/constants'
import { ignaiChatbotRtBlock } from '@typebot.io/schemas/features/blocks/integrations/ignaiChatbotRt/schema'
import React from 'react'

type Props = {
  options: ignaiChatbotRtBlock['options']
  onOptionsChange: (options: ignaiChatbotRtBlock['options']) => void
}

export const IgnaiChatbotSettings = ({ options, onOptionsChange }: Props) => {
  const updateTask = (task: (typeof ignaiChatbotRtTasks)[number]) => {
    onOptionsChange({ ...options, task })
  }
  console.log(options)
  const task = options?.task ?? defaultIgnaiChatbotRtOptions.task

  return (
    <Stack spacing={4}>
      <DropdownList
        currentItem={options?.task ?? defaultIgnaiChatbotRtOptions.task}
        onItemSelect={updateTask}
        items={ignaiChatbotRtTasks}
      />
      {task === 'Show widget' && (
        <>
          <TextInput
            isRequired
            label="Base URL"
            defaultValue={
              options?.baseUrl ?? defaultIgnaiChatbotRtOptions.baseUrl
            }
            onChange={(baseUrl: string) => {
              onOptionsChange({ ...options, baseUrl })
            }}
            withVariableButton={false}
          />
          <TextInput
            isRequired
            label="Website token"
            defaultValue={options?.websiteToken}
            onChange={(websiteToken) =>
              onOptionsChange({ ...options, websiteToken })
            }
            moreInfoTooltip="Can be found in Chatwoot under Settings > Inboxes > Settings > Configuration, in the code snippet."
          />
          <Accordion allowMultiple>
            <AccordionItem>
              <AccordionButton justifyContent="space-between">
                Set user details
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4} as={Stack} spacing="4">
                <TextInput
                  label="ID"
                  defaultValue={options?.user?.id}
                  onChange={(id: string) => {
                    onOptionsChange({
                      ...options,
                      user: { ...options?.user, id },
                    })
                  }}
                />
                <TextInput
                  label="Name"
                  defaultValue={options?.user?.name}
                  onChange={(name: string) => {
                    onOptionsChange({
                      ...options,
                      user: { ...options?.user, name },
                    })
                  }}
                />
                <TextInput
                  label="Email"
                  defaultValue={options?.user?.email}
                  onChange={(email: string) => {
                    onOptionsChange({
                      ...options,
                      user: { ...options?.user, email },
                    })
                  }}
                />
                <TextInput
                  label="Avatar URL"
                  defaultValue={options?.user?.avatarUrl}
                  onChange={(avatarUrl: string) => {
                    onOptionsChange({
                      ...options,
                      user: { ...options?.user, avatarUrl },
                    })
                  }}
                />
                <TextInput
                  label="Phone number"
                  defaultValue={options?.user?.phoneNumber}
                  onChange={(phoneNumber: string) => {
                    onOptionsChange({
                      ...options,
                      user: { ...options?.user, phoneNumber },
                    })
                  }}
                />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </>
      )}
    </Stack>
  )
}
