import { ColorPicker } from '@/components/ColorPicker'
import { ImageUploadContent } from '@/components/ImageUploadContent'
import { ChevronDownIcon } from '@/components/icons'
import { useTypebot } from '@/features/editor/providers/TypebotProvider'
import { useWorkspace } from '@/features/workspace/WorkspaceProvider'
import {
  Button,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
} from '@chakra-ui/react'
import { ButtonTheme } from '@typebot.io/nextjs'
import React from 'react'

type Props = {
  buttonTheme: ButtonTheme | undefined
  onChange: (newButtonTheme?: ButtonTheme) => void
}

export const ButtonThemeSettings = ({ buttonTheme, onChange }: Props) => {
  const { workspace } = useWorkspace()
  const { typebot } = useTypebot()
  const updateBackgroundColor = (backgroundColor: string) => {
    onChange({
      ...buttonTheme,
      backgroundColor,
    })
  }

  const updateCustomIconSrc = (customIconSrc: string) => {
    onChange({
      ...buttonTheme,
      customIconSrc,
    })
  }

  const updateSize = (size: ButtonTheme['size']) =>
    onChange({
      ...buttonTheme,
      size,
    })

  return (
    <Stack spacing={4} borderWidth="1px" rounded="md" p="4">
      <Heading size="sm">Botão</Heading>
      <Stack spacing={4}>
        <HStack justify="space-between">
          <Text>Tamanho</Text>
          <Menu>
            <MenuButton as={Button} size="sm" rightIcon={<ChevronDownIcon />}>
              {buttonTheme?.size ?? 'medium'}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => updateSize('medium')}>medio</MenuItem>
              <MenuItem onClick={() => updateSize('large')}>grande</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
        <HStack justify="space-between">
          <Text>Cor</Text>
          <ColorPicker
            defaultValue={buttonTheme?.backgroundColor}
            onColorChange={updateBackgroundColor}
          />
        </HStack>
        <HStack justify="space-between">
          <Text>Icone customizado</Text>
          <Popover isLazy>
            {({ onClose }) => (
              <>
                <PopoverTrigger>
                  <Button size="sm">Escolha uma imagem</Button>
                </PopoverTrigger>
                <PopoverContent p="4" w="500px">
                  {workspace?.id && typebot?.id && (
                    <ImageUploadContent
                      onSubmit={(url) => {
                        updateCustomIconSrc(url)
                        onClose()
                      }}
                      uploadFileProps={{
                        workspaceId: workspace.id,
                        typebotId: typebot.id,
                        fileName: 'bubble-icon',
                      }}
                    />
                  )}
                </PopoverContent>
              </>
            )}
          </Popover>
        </HStack>
      </Stack>
    </Stack>
  );
}