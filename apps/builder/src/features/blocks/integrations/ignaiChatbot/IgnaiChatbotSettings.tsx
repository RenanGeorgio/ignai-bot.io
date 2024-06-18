import React from 'react'
import { Stack } from '@chakra-ui/react'
import { DropdownList } from '@/components/DropdownList'
import { TextInput } from '@/components/inputs'
import { defaultIgnaiChatbotRtOptions, ignaiChatbotRtTasks } from '@typebot.io/schemas/features/blocks/integrations/ignaiChatbotRt/constants'
import { ignaiChatbotRtBlock } from '@typebot.io/schemas/features/blocks/integrations/ignaiChatbotRt/schema'

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
  const uri = options?.baseUrl ?? defaultIgnaiChatbotRtOptions.baseUrl

  return (
    <Stack spacing={4}>
      <DropdownList
        currentItem={task}
        onItemSelect={updateTask}
        items={ignaiChatbotRtTasks}
      />
      {task === 'Show widget' && (
        <>
          <TextInput
            isRequired
            label="Base URL"
            defaultValue={uri}
            onChange={(baseUrl: string) => {
              onOptionsChange({ ...options, baseUrl })
            }}
            withVariableButton={false}
          />
        </>
      )}
    </Stack>
  );
}