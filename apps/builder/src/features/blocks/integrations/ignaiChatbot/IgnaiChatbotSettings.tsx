import { DropdownList } from '@/components/DropdownList'
import { TextInput } from '@/components/inputs'
import { Stack } from '@chakra-ui/react'
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
        </>
      )}
    </Stack>
  )
}
